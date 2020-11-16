import React from 'react';
import { matchPath, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <div id='header'>
      <div className='container'>
        <nav id='main-nav'>
          <h1 className='nav-name'>MUHAMMET GOK</h1>
          <ul>
            <li
              className={
                matchPath(props.location.pathname, {
                  path: '/',
                  exact: true,
                })
                  ? 'active'
                  : ''
              }>
              <Link to='/'>Home</Link>
            </li>
            <li
              className={
                matchPath(props.location.pathname, {
                  path: '/galleries',
                })
                  ? 'active'
                  : matchPath(props.location.pathname, {
                      path: '/mylife',
                    })
                  ? 'active'
                  : matchPath(props.location.pathname, {
                      path: '/media',
                    })
                  ? 'active'
                  : ''
              }>
              <Link to='/galleries'>Galleries</Link>
            </li>
            <li
              className={
                matchPath(props.location.pathname, {
                  path: '/about',
                })
                  ? 'active'
                  : ''
              }>
              <Link to='/about'>About</Link>
            </li>
            <li
              className={
                matchPath(props.location.pathname, {
                  path: '/contact',
                })
                  ? 'active'
                  : ''
              }>
              <Link to='/contact'>Contact</Link>
            </li>
            <li
              className={
                matchPath(props.location.pathname, {
                  path: '/blog',
                })
                  ? 'active'
                  : ''
              }>
              <Link to='/blog'>Blog</Link>
            </li>
            <li
              className={
                matchPath(props.location.pathname, {
                  path: '/showreel',
                })
                  ? 'active'
                  : ''
              }>
              <Link to='/showreel'>Showreel</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default withRouter(Navbar);
// export default Navbar;
