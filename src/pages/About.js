import React, { useEffect } from 'react';

function About() {
  useEffect(() => {
    document.title = 'MUHAMMET GOK | About Me';
  }, []);
  return (
    <div id='about'>
      <div className='container'>
        <div className='about'>
          <div className='about-title'>ABOUT</div>
          <div className='about-content'>
            <div className='about-image' />
            <div className='about-text'>
              <div>
                <p className='about-content'>
                  Muhammet Gok is a Turkish director. He was born in
                  Kahramanmaras, Turkey. He has been living in Germany. He is
                  married. He has a daughter named Sara. Muhammet speaks
                  Turkish, Russian, and English.
                  <br />
                  <br />
                  Muhammet Gok directed many tv series and commercials in
                  Turkey, Germany, Tunisia, and Algeria. He started to prepare a
                  new tv series in Tunisia.
                </p>
              </div>
              <p className='my-1 mg-text'>MG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
