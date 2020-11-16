const { admin, db } = require('../util/admin');
const config = require('../util/config'); //fonksiyon olmadiginda config ve benzeri seyler {config}  seklinde degil de config diye parantezsiz olarak yaziliyor

exports.getBlogs = (req, res) => {
  db.collection('blog')
    .orderBy('orderNo', 'desc')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let blog = [];
      data.forEach((doc) => {
        blog.push({
          blogId: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          blogText: doc.data().blogText,
          image: doc.data().image,
          location: doc.data().location,
          createdAt: doc.data().createdAt,
          orderNo: doc.data().orderNo,
        });
      });
      return res.json(blog);
    })
    .catch((err) => console.error(err));
};

exports.getBlog = (req, res) => {
  let blogData = {};
  db.doc(`/blog/${req.params.blogId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Blog Not Found' });
      }
      blogData = doc.data();
      blogData.blogId = doc.id;
      return res.json(blogData);
    })

    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
};

exports.postBlog = (req, res) => {
  let errors = {};
  if (req.body.title.trim() === '') {
    errors.title = 'title must not be empty';
  }

  if (req.body.orderNo === null) {
    errors.orderNo = 'orderNo must not be empty';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors: errors });
  }

  const newBlog = {
    title: req.body.title,
    description: req.body.description,
    blogText: req.body.blogText,
    location: req.body.location,
    image: req.body.image,
    createdAt: new Date().toISOString(),
    orderNo: req.body.orderNo,
  };

  db.collection('blog')
    .add(newBlog)
    .then((doc) => {
      const blog = newBlog;
      blog.blogId = doc.id;
      return res.json({ blog });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });
};

exports.deleteBlog = (req, res) => {
  const document = db.doc(`/blog/${req.params.blogId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      return document.delete();
    })
    .then(async () => {
      const bucket = admin.storage().bucket();
      await bucket.deleteFiles({
        prefix: `${req.params.blogId}/`,
      });
    })
    .then(() => {
      db.collection('blog')
        .orderBy('orderNo', 'desc')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
          let blog = [];
          data.forEach((doc) => {
            blog.push({
              blogId: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              blogText: doc.data().blogText,
              image: doc.data().image,
              location: doc.data().location,
              createdAt: doc.data().createdAt,
              orderNo: doc.data().orderNo,
            });
          });
          return res.json(blog);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateBlogsImageUrl = async (req, res) => {
  const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/blogimages%2F${req.params.imageId}.${req.params.imageExtension}?alt=media`;



  try {
    await db.doc(`/blog/${req.params.imageId}`).update({ image: imageUrl });
    return res.json({
      message: 'Image uploaded successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
};
