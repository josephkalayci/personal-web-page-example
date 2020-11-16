import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Galleries() {
  useEffect(() => {
    document.title = 'MUHAMMET GOK | Galleries';
  }, []);
  return (
    <div id='galleries'>
      <div className='container'>
        <Link to='/mylife'>
          <div className='galleries-mylife'>
            <span style={{ color: '#000' }}>MY </span>
            <span style={{ color: '#480300' }}>LI</span>
            <span style={{ color: '#D80902' }}>F</span>
            <span style={{ color: '#900601' }}>E</span>
          </div>
        </Link>
        <Link to='/media'>
          <div className='galleries-media'>MEDIA</div>
        </Link>
      </div>
    </div>
  );
}

export default Galleries;
