import React, { useEffect } from 'react';

import '../style/main.css';
import '../App.css';

function Home() {
  useEffect(() => {
    document.title = 'MUHAMMET GOK';
  }, []);
  return (
    <div id='home'>
      <div className='container'>
        <p className='quote'>
          There is no end. <br /> There is no beginning. <br /> There is only
          the infinite passion of life.
          <br />
          <br />
          <span
            style={{
              color: '#756464',
            }}>
            Federico Fellini
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
