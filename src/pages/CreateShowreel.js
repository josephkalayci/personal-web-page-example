import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IsAuthenticated from '../util/IsAuthenticated';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

function CreateShowreel(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }
  const [validators, setValidators] = useState({
    errors: {},
    loading: false,
    isSuccessfull: false,
    isFailed: false,
  });
  const { loading, isSuccessfull, isFailed } = validators;
  const [showreel, setShowreel] = useState({
    orderNo: 0,
    showreelUrl: '',
  });

  useEffect(() => {
    document.title = 'MUHAMMET GOK | Create Showreel';
  }, []);

  const clearForm = () => {
    setValidators({
      ...validators,
      errors: {},
      loading: false,
      isSuccessfull: false,
      isFailed: false,
    });
    setShowreel({
      orderNo: 0,
      showreelUrl: '',
    });
  };

  const handleSubmit = (event) => {
    console.log('handleSubmit', event);
    event.preventDefault();
    setValidators({
      ...validators,
      loading: true,
      isSuccessfull: !isFailed,
    });

    axios
      .post('/showreel', showreel)
      .then((res) => {
        console.log('res.data', res.data);
        setValidators({
          ...validators,
          loading: false,
          isSuccessfull: !isFailed,
        });
      })
      .catch((err) => {
        setValidators({
          ...validators,
          loading: false,
          isSuccessfull: !isFailed,
        });
        console.log('error', err);
      });
  };

  return (
    <div id='create-showreel'>
      <div className='container'>
        <div className='create-showreel'>
          <p className='create-showreel-title'>CREATE A SHOWREEL</p>
          <div className='create-showreel-form'>
            <div>
              <p>
                Note: Showreels will be ordered on the Showreel page based on
                the order numbers. Showreels will be sorted by descending order
                numbers. Showreels with the same order numbers will be sorted by
                descending creation date. Showreels with higher order number
                will be displayed first.
              </p>
              <br />
              <form onSubmit={handleSubmit}>
                <div className='text-fields'>
                  <label htmlFor='showreel'>Showreel URL:</label>
                  <input
                    type='text'
                    name='showreel'
                    required
                    className='text-input name-input'
                    placeholder='https://...'
                    value={showreel.showreelUrl}
                    onChange={(event) => {
                      setShowreel({
                        ...showreel,
                        showreelUrl: event.target.value,
                      });
                    }}
                  />
                  <label>Order Number:</label>
                  <input
                    type='number'
                    name='orderNo'
                    className='text-input name-input'
                    placeholder='Order Number'
                    value={showreel.orderNo}
                    onChange={(event) => {
                      setShowreel({
                        ...showreel,
                        orderNo: event.target.value,
                      });
                    }}
                  />
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
              ? 'Creating Showreel - Please wait'
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
                'Good job! Showreel is created.'
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

export default CreateShowreel;
