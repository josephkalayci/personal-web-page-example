import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IsAuthenticated from '../util/IsAuthenticated';
import firebase, { firebaseConfig } from '../firebase/firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

function CreateBlog(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }

  const [blog, setBlog] = useState({
    orderNo: 0,
    title: '',
    description: '',
    location: '',
    blogText: '',
    image: '',
  });
  // const [blogId, setBlogId] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [validators, setValidators] = useState({
    errors: {},
    loading: false,
    isSuccessfull: false,
    isFailed: false,
  });
  const { loading, isSuccessfull, isFailed } = validators;

  useEffect(() => {
    document.title = 'MUHAMMET GOK | Create Blog';
  }, []);

  const clearForm = () => {
    setBlog({
      ...blog,
      orderNo: 0,
      title: '',
      description: '',
      location: '',
      blogText: '',
      image: '',
    });
    setValidators({
      ...validators,
      errors: {},
      loading: false,
      isSuccessfull: false,
      isFailed: false,
    });
  };
  const imageUploader = async (file, blogId) => {
    // let reader = new FileReader();
    // let file = event.target.files[0];
    let fileExtension = file.name.split('.')[file.name.split('.').length - 1];
    console.log('file', file);
    console.log('file extension', fileExtension);
    // Create a root reference

    var storageRef = firebase.storage().ref();
    console.log('storageref', storageRef);
    console.log('filepath, filename and extension', blogId);
    // Create a reference to 'images/mountains.jpg'
    var imageRef = storageRef.child(`blogimages/${blogId}.${fileExtension}`);

    return await imageRef.put(file).then((snapshot) => {
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/blogimages%2F${blogId}.${fileExtension}?alt=media`;
      console.log('Uploaded a blob or file!', snapshot);
      console.log('imageUrl', imageUrl);

      postContentLinks(blogId, fileExtension);
      return blogId;
    });
  };

  const postContentLinks = async (blogId, imageExtension) => {
    try {
      const res = await axios.post(`/blog/${blogId}/${imageExtension}`);
      console.log('image link is updated', res);
      return res;
    } catch (err) {
      console.log('image link could not be updated', err);
    }
  };

  const handleSubmit = (event) => {
    console.log('handleSubmit', event);
    event.preventDefault();

    setValidators({
      ...validators,
      loading: true,
    });
    axios
      .post('/blog', blog)
      .then((res) => {
        console.log('res.data', res.data);
        // setBlogId('');

        return res.data.blog.blogId;
      })
      .then(async (returnedBlogId) => {
        console.log('returnedBlogId', returnedBlogId);
        try {
          return await imageUploader(blogImage, returnedBlogId);
        } catch (error) {
          console.log('error in image upload', error);
          setValidators({
            ...validators,
            isFailed: true,
          });
        }
      })
      .then(() => {
        setValidators({
          ...validators,
          loading: false,
          isSuccessfull: !isFailed,
        });
      })
      .catch((err) => {
        setValidators({
          ...validators,
          isFailed: true,
        });
        console.log('error', err);
      });
  };

  const uploadImage = (event) => {
    const image = event.target.files[0];

    if (image && (image.type === 'image/png' || image.type === 'image/jpeg')) {
      return setBlogImage(image);
    } else {
      window.alert('Please select images only in jpg, jpeg or png extensions');
      document.getElementById('image').value = null;
    }
  };

  return (
    <div id='create-blog'>
      <div className='container'>
        <div className='create-blog'>
          <p className='create-blog-title'>CREATE A BLOG</p>
          <div className='create-blog-form'>
            <div>
              <p>
                Note: Blogs will be ordered on the Blog page based on the order
                numbers. Blogs will be sorted by descending order numbers. Blogs
                with the same order numbers will be sorted by descending
                creation date. Blog with higher order number will be displayed
                first.
              </p>
              <br />
              <form onSubmit={handleSubmit}>
                <div className='text-fields'>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    name='title'
                    className='text-input name-input'
                    value={blog.title}
                    required
                    onChange={(event) => {
                      setBlog({
                        ...blog,
                        title: event.target.value,
                      });
                    }}
                  />
                  <label htmlFor='description'>Description</label>
                  <input
                    type='text'
                    required
                    name='description'
                    className='text-input name-input'
                    value={blog.description}
                    onChange={(event) => {
                      setBlog({
                        ...blog,
                        description: event.target.value,
                      });
                    }}
                  />
                  <label htmlFor='location'>Location</label>
                  <input
                    type='text'
                    name='location'
                    required
                    className='text-input name-input'
                    value={blog.location}
                    onChange={(event) => {
                      setBlog({
                        ...blog,
                        location: event.target.value,
                      });
                    }}
                  />
                  <label htmlFor='orderNo'>Order Number</label>
                  <input
                    type='number'
                    name='orderNo'
                    required
                    className='text-input name-input'
                    value={blog.orderNo}
                    onChange={(event) => {
                      setBlog({
                        ...blog,
                        orderNo: event.target.value,
                      });
                    }}
                  />
                  <label htmlFor='image'>Blog Image </label>
                  <input
                    name='image'
                    required
                    id='image'
                    type='file'
                    accept='image/*'
                    onChange={uploadImage}
                  />
                  <label htmlFor='blogText'>Blog Text</label>
                  <textarea
                    className='text-input message-input'
                    name='message'
                    required
                    value={blog.blogText}
                    onChange={(event) => {
                      setBlog({
                        ...blog,
                        blogText: event.target.value,
                      });
                    }}></textarea>
                </div>
                <button className='btn' type='submit'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {
        <Dialog
          open={loading || isSuccessfull || isFailed}
          keepMounted
          onClose={() => {
            setValidators({
              ...validators,
              isSuccessfull: false,
              isFailed: false,
              loading: false,
            });
          }}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'>
          <DialogTitle id='alert-dialog-slide-title'>
            {!isSuccessfull && !isFailed
              ? 'Creating the blog - Please wait'
              : isFailed
              ? 'Failed'
              : 'Successful'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              {!isSuccessfull && !isFailed ? (
                <CircularProgress
                  color='secondary'
                  size={50}
                  style={{ display: 'block', margin: 'auto' }}
                />
              ) : isFailed ? (
                'Failed - Try again'
              ) : (
                'Good job! Blog is created.'
              )}
            </DialogContentText>
          </DialogContent>
          {(isSuccessfull || isFailed) && (
            <DialogActions>
              <Button onClick={clearForm} color='primary'>
                Dismiss
              </Button>
            </DialogActions>
          )}
        </Dialog>
      }
    </div>
  );
}

export default CreateBlog;
