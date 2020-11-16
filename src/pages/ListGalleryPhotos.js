// import React, { useEffect, useState, useMemo } from 'react';
import React, { useEffect, useState } from 'react';
import firebase from '../firebase/firebase';
import loadingSipnner from '../util/loadingSpinner';
import MaterialTable from 'material-table';
//Files
import '../App.css';
import IsAuthenticated from '../util/IsAuthenticated';

export default function ListGalleryPhotos(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }

  const columns = [
    { title: 'Image Url', field: 'imageUrl' },
    {
      title: 'Image Type',
      field: 'type',
    },
  ];

  const [loading, setLoading] = useState(true);

  const [mergedItems, setMergedItems] = useState([]);

  // If you still need to store each itemsType in a separate lists you could do the following
  // const media = useMemo(
  //   () => mergedItems.filter((myLifeItem) => myLifeItem.type === 'Media'),
  //   [mergedItems],
  // );
  // const myLife = useMemo(
  //   () => mergedItems.filter((myLifeItem) => myLifeItem.type === 'My Life'),
  //   [mergedItems],
  // );

  const getAllPhotos = async () => {
    const storageRefMedia = firebase.storage().ref('media');
    const storageRefMyLife = firebase.storage().ref('mylife');

    const itemsMapFactory = (type) => async (imageRef) => {
      const imageUrl = await imageRef.getDownloadURL();
      return { imageUrl, type };
    };
    const [mediaItems, myLifeItems] = await Promise.all([
      storageRefMedia.listAll(),
      storageRefMyLife.listAll(),
    ]).catch((error) => {
      console.log('error', error);
      setLoading(false);
    });

    await Promise.all([
      ...mediaItems.items.map(itemsMapFactory('Media')),
      ...myLifeItems.items.map(itemsMapFactory('My Life')),
    ])
      .then((hay) => {
        setMergedItems(hay);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllPhotos();
    //eslint-disable-next-line
  }, []);

  return loading ? (
    loadingSipnner
  ) : (
    <div id='table'>
      <div className='container'>
        <MaterialTable
          title='Gallery Photos'
          columns={columns}
          data={mergedItems}
          editable={{
            onRowDelete: async (oldData) => {
              IsAuthenticated();
              let fileName = oldData.imageUrl
                .split('?alt=media')[0]
                .split('%2F')[1];
              oldData.type === 'Media'
                ? (fileName = 'media/' + fileName)
                : (fileName = 'mylife/' + fileName);

              // console.log('desertRef', desertRef);
              console.log('oldData', oldData);
              console.log('fileName', fileName);

              await firebase
                .storage()
                .ref()
                .child(fileName)
                .delete()
                .then(function () {
                  getAllPhotos();
                  console.log('Delete successful');
                })
                .catch(function (error) {
                  console.log('error', error);
                });
            },
          }}
        />
      </div>
    </div>
  );
}
