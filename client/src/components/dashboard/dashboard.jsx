import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { get_userProfile } from './../../store/actions/profile';
import Experience from './experienceList';

import Education from './education.componenet';
import DashboardLinks from './dashboardLinks.component';
import Spinner from './../common/spinner.component';

const Dashboard = ({
  auth: { loading, user },
  profile: { profile, loading: profileLoading },
  get_userProfile,
}) => {
  useEffect(() => {
    get_userProfile();
  }, [get_userProfile]);

  return loading && user === null ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'> Welcome :{user && user.name} </i>
      </p>
      <hr />
      {profileLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {profile !== null ? (
            <Fragment>
              <DashboardLinks />
              <Experience experiences={profile.experience} />
              <Education educations={profile.education} />
            </Fragment>
          ) : (
            <Fragment>
              <p>NO Profile Found ! Click to add Profile</p>
              <Link to='/create-profile' className='btn btn-primary my-2'>
                {' '}
                Create profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
const connectComponent = connect(mapStateToProps, { get_userProfile });
export default connectComponent(Dashboard);
