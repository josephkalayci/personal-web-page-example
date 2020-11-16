import React, { useEffect, useState } from 'react';
import axios from 'axios';
import firebase from '../firebase/firebase';
import IsAuthenticated from '../util/IsAuthenticated';
import loadingSipnner from '../util/loadingSpinner';

function Login(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  if (IsAuthenticated()) {
    props.history.push('/admin');
  }

  useEffect(() => {
    document.title = 'MUHAMMET GOK | Login';
  }, []);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    console.log('handleSubmit', event);
    event.preventDefault();
    setLoading(true);

    axios
      .post('/login', user)
      .then((res) => {
        console.log('res.data', res.data);
        localStorage.setItem('MGToken', `Bearer ${res.data.token}`);
        setLoading(false);
        props.history.push('/admin');
      })
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password)
          .catch((error) => {
            console.log('error.message', error.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log('error', err);
      });
  };

  return (
    <div id='login'>
      <div className='container'>
        <div className='login'>
          <p className='login-title'>Login</p>

          {loading ? (
            loadingSipnner
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='text-fields'>
                <input
                  type='email'
                  name='email'
                  className='text-input'
                  placeholder='Email Address'
                  onChange={handleChange}
                />
                <input
                  type='password'
                  name='password'
                  className='text-input'
                  placeholder='Password'
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <button className='btn' type='submit'>
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
