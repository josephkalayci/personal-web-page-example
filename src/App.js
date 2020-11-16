import React from 'react';
import './style/main.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Showreel from './pages/Showreel';
import Galleries from './pages/Galleries';
import Gallery from './pages/Gallery';
import About from './pages/About';
import BlogPage from './pages/BlogPage';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import axios from 'axios';
import CreateShowreel from './pages/CreateShowreel';
import CreateBlog from './pages/CreateBlog';
import ListGalleryPhotos from './pages/ListGalleryPhotos';
import ListMessages from './pages/ListMessages';
import ListShowreel from './pages/ListShowreel';
import ListBlogs from './pages/ListBlogs';

import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import CreateGalleryImage from './pages/CreateGalleryImage';

axios.defaults.baseURL =
  'https://us-central1-muhammet-gok.cloudfunctions.net/api';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/showreel' component={Showreel} />
        <Route exact path='/galleries' component={Galleries} />
        <Route exact path='/mylife' component={Gallery} />
        <Route exact path='/media' component={Gallery} />
        <Route exact path='/about' component={About} />
        <Route exact path='/blog' component={Blogs} />
        <Route exact path='/blog/:blogid' component={BlogPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/list-blogs' component={ListBlogs} />
        <Route exact path='/list-messages' component={ListMessages} />
        <Route exact path='/list-showreel' component={ListShowreel} />
        <Route
          exact
          path='/list-gallery-photos'
          component={ListGalleryPhotos}
        />
        <Route exact path='/create-showreel' component={CreateShowreel} />
        <Route
          exact
          path='/upload-gallery-photo'
          component={CreateGalleryImage}
        />
        <Route exact path='/create-blog' component={CreateBlog} />
        <Route exact path='/' component={Home} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
