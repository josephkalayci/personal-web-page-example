import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const loadingSpinner = (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
    <CircularProgress
      size={100}
      thickness={2}
      color={'inherit'}
      style={{ marginTop: '30vh' }}
    />
  </div>
);

export default loadingSpinner;
