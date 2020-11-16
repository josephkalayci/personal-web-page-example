import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loadingSipnner from '../util/loadingSpinner';
import { Link } from 'react-router-dom';

function Blogs() {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    document.title = 'MUHAMMET GOK | Blog';
    setLoading(true);
    console.log('test');
    axios
      .get(`/blog`)
      .then((res) => {
        console.log('result', res.data);
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div id='blog'>
      <div className='container'>
        <div className='blog'>
          <p className='blog-page-title'>BLOG</p>
          {loading ? (
            loadingSipnner
          ) : (
            <div>
              <div className='blog-content'>
                <div className='blog-column'>
                  {blogs.map((blog, index) => {
                    if (index % 2 === 0) {
                      return (
                        <Link to={'/blog/' + blog.blogId}>
                          <div className='blog-column-item' key={index}>
                            <div
                              className='blog-image'
                              style={{
                                backgroundImage: `url(${blog.image})`,
                              }}></div>
                            <p className='blog-title'>{blog.title}</p>
                            <p className='blog-text'>{blog.description}</p>
                          </div>
                        </Link>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className='blog-column'>
                  {blogs.map((blog, index) => {
                    if (index % 2 === 1) {
                      return (
                        <Link to={'/blog/' + blog.blogId}>
                          <div className='blog-column-item' key={index}>
                            <div
                              className='blog-image'
                              style={{
                                backgroundImage: `url(${blog.image})`,
                              }}></div>
                            <p className='blog-title'>{blog.title}</p>
                            <p className='blog-text'>{blog.description}</p>
                          </div>
                        </Link>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
