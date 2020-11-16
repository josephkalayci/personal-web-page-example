import React, { useEffect, useState } from 'react';
import IsAuthenticated from '../util/IsAuthenticated';
import firebase, { firebaseConfig } from '../firebase/firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BackupIcon from '@material-ui/icons/Backup';
import getFormattedDate from '../util/getFormattedDate';

function CreateGalleryImage(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }
  const [imageList, setImageList] = useState(['']);

  const [validators, setValidators] = useState({
    errors: {},
    loading: false,
    isSuccessfull: false,
    isFailed: false,
  });
  const { loading, isSuccessfull, isFailed } = validators;

  useEffect(() => {
    document.title = 'MUHAMMET GOK | Upload Gallery Photo';
  }, []);

  const clearForm = () => {
    setImageTypes(['mylife']);
    setImageList(['']);
    setValidators({
      ...validators,
      errors: {},
      loading: false,
      isSuccessfull: false,
      isFailed: false,
    });
  };
  const imageUploader = async (file, key) => {
    let fileExtension = file.name.split('.')[file.name.split('.').length - 1];
    console.log('file', file);
    console.log('file extension', fileExtension);

    let fileName = getFormattedDate();
    var storageRef = firebase.storage().ref();
    console.log('storageref', storageRef);
    console.log('filename', fileName);

    var imageRef = storageRef.child(
      `${imageTypes[key]}/${fileName}.${fileExtension}`,
    );

    return await imageRef.put(file).then((snapshot) => {
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageTypes[key]}%2F${fileName}.${fileExtension}?alt=media`;
      console.log('Uploaded a blob or file!', snapshot);
      console.log('imageUrl', imageUrl);

      return imageUrl;
    });
  };

  const [imageTypes, setImageTypes] = React.useState(['mylife']);

  const handleChange = (index, event) => {
    setImageTypes([
      ...imageTypes.slice(0, index),
      event.target.value,
      ...imageTypes.slice(index + 1),
    ]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (IsAuthenticated()) {
      setValidators({
        ...validators,
        loading: true,
      });

      try {
        for (const key in imageList) {
          if (imageList[key] !== '') {
            try {
              await imageUploader(imageList[key], key);
            } catch (error) {
              console.log('error in imageList upload', error);
              setValidators({
                ...validators,
                isFailed: true,
              });
            }
          }
        }
        setValidators({
          ...validators,
          loading: false,
          isSuccessfull: !isFailed,
        });

        console.log('submit successfull');
      } catch (error) {
        setValidators({
          ...validators,
          loading: false,
          isSuccessfull: !isFailed,
        });
        console.log('submit failed');
      }
    } else {
      window.alert('Session expired. Login again');
    }
  };

  const removeFromImageList = (index) => {
    setImageList([...imageList.slice(0, index), ...imageList.slice(index + 1)]);
    setImageTypes([
      ...imageTypes.slice(0, index),
      ...imageTypes.slice(index + 1),
    ]);
  };

  const addToImageList = () => {
    setImageList([...imageList, '']);
    setImageTypes([...imageTypes, 'mylife']);
  };

  const uploadImageList = (event, index) => {
    const image = event.target.files[0];

    if (image && (image.type === 'image/png' || image.type === 'image/jpeg')) {
      return setImageList([
        ...imageList.slice(0, index),
        image,
        ...imageList.slice(index + 1),
      ]);
    } else {
      window.alert('Please select images with only jpg, jpeg or png formats');
      document.getElementById(`imageListInput${index}`).imageTypes = null;
    }
  };
  return (
    <div id='create-gallery'>
      <div className='container'>
        <div className='create-gallery'>
          <p className='create-gallery-title'>Upload a Photo to the Gallery</p>
          <div className='create-gallery-form'>
            <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor='image'>Select photo and types</label>
                <div className='text-fields'>
                  {imageList.map((item, index) => (
                    <div
                      style={{
                        marginBottom: '1%',
                      }}
                      key={index}>
                      <FormControl component='fieldset'>
                        <RadioGroup
                          row
                          aria-label='type'
                          name='type'
                          value={imageTypes[index]}
                          onChange={(event) => {
                            handleChange(index, event);
                          }}>
                          <FormControlLabel
                            value='mylife'
                            control={<Radio />}
                            label='My Life'
                          />

                          <FormControlLabel
                            value='media'
                            control={<Radio />}
                            label='Media'
                          />
                        </RadioGroup>
                      </FormControl>

                      <Button variant='contained' component='label'>
                        <BackupIcon style={{ marginRight: '1rem' }} />
                        <input
                          id={`imageListInput${index}`}
                          type='file'
                          accept='image/*'
                          style={{ display: 'none' }}
                          onChange={(event) => {
                            uploadImageList(event, index);
                          }}
                        />
                        <p>
                          {imageList[index]
                            ? imageList[index].name
                            : '***Select Image***'}
                        </p>
                      </Button>
                      <Button>
                        <RemoveCircleIcon
                          onClick={() => removeFromImageList(index)}
                        />
                      </Button>
                    </div>
                  ))}

                  <Button onClick={addToImageList}>
                    Add more images <AddCircleIcon />
                  </Button>
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
              ? 'Uploading Photos - Please wait'
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
                'Good job! Photos are uploaded.'
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

export default CreateGalleryImage;
