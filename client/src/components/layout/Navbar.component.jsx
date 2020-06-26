import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout_user } from '../../store/actions/auth';

const Navbar = ({ isAuthticated, loading, logout_user }) => {
  const logoutFun = () => {
    return (
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>
        <li>
          <Link to='/posts'>Posts</Link>
        </li>
        <li>
          <Link to='/dashboard'>
            <i className='fas fa-user'> </i> <span className='sm-hide'>Dashboard</span>
          </Link>
        </li>
        <li>
          <i className='fas fa-sign-out-alt' onClick={logout_user}>
            {' '}
            <Link to='/'>Logout</Link>{' '}
          </i>
        </li>
      </ul>
    );
  };

  const loginFun = () => {
    return (
      <ul>
        <li>
          <Link to='/profiles'>Developers</Link>
        </li>

        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    );
  };
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {!loading && isAuthticated ? logoutFun() : loginFun()}
    </nav>
  );
};

const mapStateTopProps = (state) => ({
  isAuthticated: state.auth.isAuthticated,
  loading: state.auth.loading,
});

const mapDisptchTopProps = (dispatch) => {
  return {
    logout_user: () => dispatch(logout_user()),
  };
};
const connectComponent = connect(mapStateTopProps, mapDisptchTopProps);
export default connectComponent(Navbar);
