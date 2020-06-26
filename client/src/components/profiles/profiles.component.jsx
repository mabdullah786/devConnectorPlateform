import React, { useEffect, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { get_allprofilesList } from '../../store/actions/profile';

import Spinner from './../common/spinner.component';
import ProfileItem from './profileItems.component';

const Profiles = ({ get_allprofilesList, profile: { profiles, loading } }) => {
  useEffect(() => {
    get_allprofilesList();
  }, [get_allprofilesList]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className='container'>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop'></i> Browse and connect with developers
            </p>
            <div className='profiles'>
              {profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  get_allprofilesList: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { get_allprofilesList })(Profiles);
