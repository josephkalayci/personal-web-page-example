const { db } = require('../util/admin');

exports.contactUs = (req, res) => {
  let errors = {};

  if (req.body.message.trim() === '') {
    errors.message = 'Please enter your message';
  }

  if (req.body.name.trim() === '') {
    errors.name = 'Please enter your name';
  }

  if (req.body.phone.trim() === '') {
    errors.phone = 'Please enter your phone';
  }

  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!req.body.email.match(regEx)) {
    errors.email = 'Email is not valid';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: errors });
  }

  const newMessage = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    message: req.body.message,
    createdAt: new Date().toISOString(),
  };

  db.collection('contactUsMessages')
    .add(newMessage)
    .then((doc) => {
      const message = newMessage;
      message.messageId = doc.id;
      return res.json({ message });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err });
    });
};

exports.getContactUsMessages = (req, res) => {
  db.collection('contactUsMessages')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let contact = [];
      data.forEach((doc) => {
        contact.push({
          messageId: doc.id,
          email: doc.data().email,
          message: doc.data().message,
          subject: doc.data().subject,
          name: doc.data().name,
          phone: doc.data().phone,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(contact);
    })
    .catch((err) => console.error(err));
};

exports.deleteContactUsMessage = (req, res) => {
  const document = db.doc(`/contactUsMessages/${req.params.contactId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(200).json({ message: 'Message not found' });
      }
      return document.delete();
    })
    .then(() => {
      db.collection('contactUsMessages')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
          let contact = [];
          data.forEach((doc) => {
            contact.push({
              messageId: doc.id,
              email: doc.data().email,
              message: doc.data().message,
              name: doc.data().name,
              phone: doc.data().phone,
              createdAt: doc.data().createdAt,
            });
          });
          return res.json(contact);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};
