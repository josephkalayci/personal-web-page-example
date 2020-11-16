import React, { useEffect, useState } from 'react';
import loadingSipnner from '../util/loadingSpinner';
import MaterialTable from 'material-table';
import axios from 'axios';
//Files
import '../App.css';
import IsAuthenticated from '../util/IsAuthenticated';

export default function ListGalleryPhotos(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }

  const columns = [
    { title: 'Showreel Url', field: 'showreelUrl' },
    {
      title: 'Order No',
      field: 'orderNo',
    },
  ];

  const [loading, setLoading] = useState(true);
  const [showreels, setShowreels] = useState([]);

  const getAllShowreels = () => {
    axios
      .get('/showreel')
      .then((res) => {
        setShowreels(res.data);
        console.log('showreels', res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllShowreels();
    //eslint-disable-next-line
  }, []);

  return loading ? (
    loadingSipnner
  ) : (
    <div id='table'>
      <div className='container'>
        <MaterialTable
          title='Gallery Photos'
          columns={columns}
          data={showreels}
          editable={{
            onRowDelete: async (oldData) => {
              IsAuthenticated();
              let showreelId = oldData.showreelId;
              console.log('oldData', oldData);

              await axios
                .delete(`/showreel/${showreelId}`)
                .then((res) => {
                  setShowreels(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          }}
        />
      </div>
    </div>
  );
}
