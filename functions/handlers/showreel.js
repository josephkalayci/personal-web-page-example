const { admin, db } = require('../util/admin');

exports.getShowreels = (req, res) => {
  db.collection('showreel')
    .orderBy('orderNo', 'desc')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let showreel = [];
      data.forEach((doc) => {
        showreel.push({
          showreelId: doc.id,
          showreelUrl: doc.data().showreelUrl,
          createdAt: doc.data().createdAt,
          orderNo: doc.data().orderNo,
        });
      });
      return res.json(showreel);
    })
    .catch((err) => console.error(err));
};

exports.postShowreel = (req, res) => {
  let errors = {};
  if (req.body.showreelUrl.trim() === '') {
    errors.showreelUrl = 'showreelUrl must not be empty';
  }

  if (req.body.orderNo === null) {
    errors.orderNo = 'orderNo must not be empty';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors: errors });
  }

  const newShowreel = {
    showreelUrl: req.body.showreelUrl,
    createdAt: new Date().toISOString(),
    orderNo: req.body.orderNo,
  };

  db.collection('showreel')
    .add(newShowreel)
    .then((doc) => {
      const showreel = newShowreel;
      showreel.showreelId = doc.id;
      return res.json({ showreel });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });
};

exports.deleteShowreel = (req, res) => {
  const document = db.doc(`/showreel/${req.params.showreelId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: 'showreel not found' });
      }
      return document.delete();
    })
    .then(() => {
      db.collection('showreel')
        .orderBy('orderNo', 'desc')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
          let showreel = [];
          data.forEach((doc) => {
            showreel.push({
              showreelId: doc.id,
              showreelUrl: doc.data().showreelUrl,
              createdAt: doc.data().createdAt,
              orderNo: doc.data().orderNo,
            });
          });
          return res.json(showreel);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};
