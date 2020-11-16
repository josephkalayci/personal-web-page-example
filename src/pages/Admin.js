import React, { useEffect } from 'react';
import IsAuthenticated from '../util/IsAuthenticated';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }
  const logout = () => {
    localStorage.removeItem('MGToken');
    delete axios.defaults.headers.common['Authorization'];
    props.history.push('/login');
  };

  useEffect(() => {
    document.title = 'MUHAMMET GOK | Admin';
  }, []);
  return (
    <div id='admin'>
      <div className='container'>
        <div className='admin'>
          <p className='admin-title'>Admin</p>
          <Link to='/upload-gallery-photo'>
            <button className='btn'>Upload Image to the Gallery</button>
          </Link>
          <Link to='/list-gallery-photos'>
            <button className='btn'>
              List and Delete Image from the Gallery
            </button>
          </Link>
          <Link to='/create-showreel'>
            <button className='btn'>Create Showreel</button>
          </Link>
          <Link to='/list-showreel'>
            <button className='btn'>List and Delete Showreels</button>
          </Link>
          <Link to='/create-blog'>
            <button className='btn'>Create a Blog</button>
          </Link>
          <Link to='/list-blogs'>
            <button className='btn'>List and Delete a Blog</button>
          </Link>
          <Link to='/list-messages'>
            <button className='btn'>List and Delete Contact Messages</button>
          </Link>
          <button className='btn btn-error' onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
