import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import loadingSipnner from '../util/loadingSpinner';

function Showreel() {
  const [showreels, setShowreels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'MUHAMMET GOK | Showreel';

    setLoading(true);
    axios
      .get('/showreel')
      .then((res) => {
        setShowreels(res.data);
        console.log('showreels', showreels);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div id='showreel'>
      <div className='container'>
        <div className='showreel'>
          <p className='showreel-title'>SHOWREEL</p>
          {loading ? (
            loadingSipnner
          ) : (
            <div>
              <div className='showreel-content'>
                {showreels.map((item, index) => (
                  <ReactPlayer
                    key={index}
                    url={item.showreelUrl}
                    controls={true}
                    width='100%'
                    height='250px'
                    className='react-player'
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Showreel;
