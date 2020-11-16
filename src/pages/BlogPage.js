import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loadingSipnner from '../util/loadingSpinner';

function BlogPage() {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState([]);

  const dateFormatter = (date) => {
    date = new Date(date);
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  };

  useEffect(() => {
    let blogId = window.location.pathname.split('/blog/')[1];
    console.log('blogId', blogId);

    document.title = 'MUHAMMET GOK | Blog';
    setLoading(true);
    axios
      .get(`/blog/${blogId}`)
      .then((res) => {
        console.log('result', res.data);
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div id='blog-page'>
      <div className='container'>
        <div className='blog-page'>
          {loading ? (
            loadingSipnner
          ) : (
            <div>
              <p className='blog-page-title'>{blog.title}</p>

              <p className='blog-page-text'>
                {dateFormatter(Date.parse(blog.createdAt))}
              </p>
              <div
                className='blog-page-image'
                style={{
                  backgroundImage: `url(${blog.image})`,
                }}></div>

              <p
                className='blog-page-text'
                style={{ fontWeight: 300, fontSize: '1.6rem' }}>
                {blog.description}
              </p>
              <p
                className='blog-page-text'
                style={{ fontWeight: 300, fontSize: '1.2rem' }}>
                {blog.blogText}
              </p>
              <p
                className='blog-page-text'
                style={{ fontWeight: 400, fontSize: '2rem' }}>
                {blog.location}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
