import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { delete_profile } from './../../store/actions/profile';

const DashboardLinks = ({ delete_profile }) => {
  return (
    <div className='dash-buttons my-3'>
      <Link to='edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary'></i> Add Experience
      </Link>
      <Link to='add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Add Education
      </Link>
      <button type='button' className='btn btn-danger' onClick={() => delete_profile()}>
        {' '}
        Delete my Profile{' '}
      </button>
    </div>
  );
};

export default connect(null, { delete_profile })(DashboardLinks);
