import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import firebase from '../firebase/firebase';
import loadingSipnner from '../util/loadingSpinner';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // var storageRef = firebase.storage().ref(window.location.pathname);
    // storageRef
    //   .listAll()
    //   .then((result) => {
    //     result.items.forEach(async (imageRef) => {
    //       const url = await imageRef
    //         .getDownloadURL()
    //         .then((url) => {
    //           // setImages([...images, { original: url, thumbnail: url }]);
    //           return url;
    //         })
    //         .catch(function (error) {
    //           console.log('error2', error);
    //         });
    //       console.log('url', url);
    //       setImages([...images, { original: url, thumbnail: url }]);
    //       return url;
    //     });
    //   })
    //   .then(() => {
    //     setLoading(false);
    //   })
    //   .catch(function (error) {
    //     console.log('error', error);
    //   });

    setLoading(true);

    const storageRef = firebase.storage().ref(window.location.pathname);
    storageRef
      .listAll()
      .then((result) => {
        Promise.all(
          result.items.map(async (imageRef) => {
            const url = await imageRef.getDownloadURL();
            return { original: url, thumbnail: url };
          }),
        ).then((newImages) => {
          setImages(newImages);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });

    document.title =
      window.location.pathname === '/mylife'
        ? 'MUHAMMET GOK | My Life'
        : 'MUHAMMET GOK | Media';
    //eslint-disable-next-line
  }, []);
  return (
    <div id='gallery'>
      <div className='container'>
        <div className='gallery'>
          <p className='gallery-page-title'>
            {window.location.pathname === '/mylife' ? 'My Life' : 'Media'}
          </p>
          {loading ? (
            loadingSipnner
          ) : (
            <div className='gallery-content'>
              <ImageGallery items={images} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Gallery;
