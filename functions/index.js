const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/FbAuth.js');

const cors = require('cors');
app.use(cors());

const {
  getBlogs,
  getBlog,
  postBlog,
  deleteBlog,
  updateBlogsImageUrl,
} = require('./handlers/blog');

const {
  contactUs,
  getContactUsMessages,
  deleteContactUsMessage,
} = require('./handlers/contactUs');

const { login } = require('./handlers/users');
const {
  getShowreels,
  postShowreel,
  deleteShowreel,
} = require('./handlers/showreel.js');

app.get('/blog/:blogId', getBlog);
app.get('/blog', getBlogs);
app.post('/blog', FBAuth, postBlog);
app.delete('/blog/:blogId', FBAuth, deleteBlog);
app.post('/blog/:imageId/:imageExtension', FBAuth, updateBlogsImageUrl);

app.get('/showreel', getShowreels);
app.post('/showreel', FBAuth, postShowreel);
app.delete('/showreel/:showreelId', FBAuth, deleteShowreel);

app.post('/contact', contactUs);
app.get('/contact', FBAuth, getContactUsMessages);
app.delete('/contact/:contactId', FBAuth, deleteContactUsMessage);

app.post('/login', login);

exports.api = functions.https.onRequest(app);
