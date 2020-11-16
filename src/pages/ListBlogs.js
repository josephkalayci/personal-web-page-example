import React, { useEffect, useState } from 'react';
import loadingSipnner from '../util/loadingSpinner';
import MaterialTable from 'material-table';
import firebase from '../firebase/firebase';

import axios from 'axios';
//Files
import '../App.css';
import IsAuthenticated from '../util/IsAuthenticated';

export default function ListBlogs(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }

  const columns = [
    { title: 'Title', field: 'title' },
    {
      title: 'Description',
      field: 'description',
    },
    {
      title: 'Blog Text',
      field: 'blogText',
    },

    {
      title: 'Image',
      field: 'image',
    },
    {
      title: 'Location',
      field: 'Location',
    },
    {
      title: 'Created At',
      field: 'createdAt',
    },
    {
      title: 'Order No',
      field: 'orderNo',
    },
  ];

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = () => {
    axios
      .get('/blog')
      .then((res) => {
        setBlogs(res.data);
        console.log('blogs', res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBlogs();
    //eslint-disable-next-line
  }, []);

  return loading ? (
    loadingSipnner
  ) : (
    <div id='table'>
      <MaterialTable
        title='Blogs'
        columns={columns}
        data={blogs}
        editable={{
          onRowDelete: async (oldData) => {
            IsAuthenticated();
            let blogId = oldData.blogId;
            // console.log('oldData', oldData);

            let fileName =
              'blogimages/' +
              oldData.image.split('?alt=media')[0].split('%2F')[1];
            // console.log('fileName', fileName);
            await axios
              .delete(`/blog/${blogId}`)
              .then((res) => {
                setBlogs(res.data);
              })
              .then(async () => {
                await firebase
                  .storage()
                  .ref()
                  .child(fileName)
                  .delete()
                  .then(function () {
                    console.log('Delete photo successful');
                  })
                  .catch(function (error) {
                    console.log('error', error);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          },
        }}
      />
    </div>
  );
}
