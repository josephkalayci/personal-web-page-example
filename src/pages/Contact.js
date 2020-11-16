import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

function Contact(props) {
  const [messageObject, setMessageObject] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const { name, email, phone, subject, message } = messageObject;

  const [validators, setValidators] = useState({
    errors: '',
    isFailed: false,
    isPosted: false,
    isSuccessful: false,
    emailInvalid: false,
  });

  const { isFailed, isPosted, isSuccessful, emailInvalid } = validators;

  useEffect(() => {
    document.title = 'MUHAMMET GOK | Contact Me';
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/contact', messageObject)
      .then((res) => {
        console.log('result', res);
        setValidators({
          ...validators,
          isSuccessful: true,
          isPosted: true,
        });

        setMessageObject({
          ...messageObject,
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      })
      .catch((err) => {
        if (
          !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
        ) {
          setValidators({
            ...validators,
            errors: err.errors,
            isFailed: false,
            isPosted: true,
            emailInvalid: true,
          });
        } else
          setValidators({
            ...validators,
            errors: err.errors,
            isFailed: false,
            isPosted: true,
            emailInvalid: false,
          });
      });
  };

  const closeDialog = () => {
    if (isSuccessful) {
      setMessageObject({
        ...messageObject,
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
      setValidators({
        ...validators,
        isPosted: false,
        isFailed: false,
        isSuccessful: false,
      });
      props.history.push('/');
    } else {
      setValidators({
        ...validators,
        isFailed: false,
        isSuccessful: false,
      });
    }
  };

  const onInput = (e) => {
    setMessageObject({
      ...messageObject,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id='contact'>
      <div className='container'>
        <div className='contact'>
          <p className='contact-title'>DROP ME A LINE</p>
          <div className='contact-content'>
            <div className='contact-info'>
              {/* <p>CONTACT ME</p> */}
              <p>MUHAMMET GOK</p>
              <p>muhammetgok@gmail.com</p>
              <div className='icons'>
                <a
                  href='https://www.facebook.com/muhammet.gok.100'
                  className='icons'>
                  <i className='fab fa-facebook-square fa-2x'></i>
                </a>
                <a href='https://www.instagram.com/muhametgok/'>
                  <i className='fab fa-instagram fa-2x'></i>
                </a>
              </div>
            </div>
            <div className='contact-form'>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className='text-fields'>
                    <input
                      type='text'
                      name='name'
                      required
                      onChange={onInput}
                      className='text-input name-input'
                      placeholder='Name'
                      value={name}
                    />
                    <input
                      type='text'
                      name='phone'
                      required
                      onChange={onInput}
                      className='text-input phone-input'
                      placeholder='Phone Number'
                      value={phone}
                    />
                    <input
                      type='email'
                      name='email'
                      required
                      error={
                        emailInvalid && isPosted && !isSuccessful ? true : false
                      }
                      onChange={onInput}
                      className='text-input email-input'
                      placeholder='Email Address'
                      value={email}
                    />
                    <input
                      type='text'
                      name='subject'
                      required
                      onChange={onInput}
                      className='text-input subject-input'
                      placeholder='Subject'
                      value={subject}
                    />
                    <textarea
                      className='text-input message-input'
                      name='message'
                      required
                      onChange={onInput}
                      value={message}
                      placeholder='Enter Message'></textarea>
                    {/* <di className='my-2'>
                    <div data-netlify-recaptcha='true'></div>
                  </di> */}
                  </div>
                  <button className='btn' type='submit'>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isSuccessful || isFailed}
        keepMounted
        onClose={closeDialog}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle id='alert-dialog-slide-title'>
          {!isSuccessful && !isFailed
            ? 'Sending your message - Please wait'
            : isFailed
            ? 'Failed'
            : 'Successful'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {!isSuccessful && !isFailed ? (
              <CircularProgress
                color='secondary'
                size={50}
                style={{ display: 'block', margin: 'auto' }}
              />
            ) : isFailed ? (
              'Failed - Please enter all fields and try again'
            ) : (
              'Thank you for your message. I will contact you soon.'
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Contact;
