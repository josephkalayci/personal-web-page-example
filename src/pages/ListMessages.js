import React, { useEffect, useState } from 'react';
import loadingSipnner from '../util/loadingSpinner';
import MaterialTable from 'material-table';
import axios from 'axios';
//Files
import '../App.css';
import IsAuthenticated from '../util/IsAuthenticated';

export default function ListMessages(props) {
  if (!IsAuthenticated()) {
    props.history.push('/login');
  }

  const columns = [
    { title: 'Name', field: 'name' },
    {
      title: 'Email',
      field: 'email',
    },
    {
      title: 'Phone',
      field: 'phone',
    },
    {
      title: 'Subject',
      field: 'subject',
    },
    {
      title: 'Message',
      field: 'message',
    },
    {
      title: 'Sent At',
      field: 'createdAt',
    },
  ];

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const getAllMessages = () => {
    axios
      .get('/contact')
      .then((res) => {
        setMessages(res.data);
        console.log('messages', res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllMessages();
    //eslint-disable-next-line
  }, []);

  return loading ? (
    loadingSipnner
  ) : (
    <div id='table'>
      <div className='container'>
        <MaterialTable
          title='Messages'
          columns={columns}
          data={messages}
          editable={{
            onRowDelete: async (oldData) => {
              IsAuthenticated();
              let messageId = oldData.messageId;
              console.log('oldData', oldData);

              await axios
                .delete(`/contact/${messageId}`)
                .then((res) => {
                  setMessages(res.data);
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
