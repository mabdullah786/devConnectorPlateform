import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfileById } from './../../store/actions/profile';

import Spinner from '../common/spinner.component';
import ProfileTop from './profileTop.component';
import ProfileBio from './profileBio.component';
import ProfileEducation from './profileEducation.component';
import ProfileExperience from './profileExperience.component';
import ProfileGithub from './profileGithub.component';

const ViewProfile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className='container'>
            <Link to='/profiles' className='btn btn-light'>
              Back To Profiles
            </Link>

            {auth &&
            auth.loading === false &&
            auth.isAuthticated &&
            !loading &&
            profile.user._id === auth.user._id ? (
              <Link to='/edit-profile' className='btn btn-primary'>
                Edit Profile
              </Link>
            ) : null}

            <div className='profile-grid my-1'>
              {/* <!-- Top --> */}
              <ProfileTop profile={profile} />

              {/* <!-- About --> */}
              <ProfileBio profile={profile} />

              {/* <!-- Experience --> */}
              <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'>Experience</h2>

                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience) => (
                      <ProfileExperience experience={experience} key={experience._id} />
                    ))}
                  </Fragment>
                ) : (
                  <p> No experience Found</p>
                )}
              </div>

              {/* <!-- Education --> */}
              <div className='profile-edu bg-white p-2'>
                <h2 className='text-primary'>Education</h2>

                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((education) => (
                      <ProfileEducation education={education} key={education._id} />
                    ))}
                  </Fragment>
                ) : (
                  <p> No Education Found</p>
                )}
              </div>

              {/* <!-- Github --> */}
              <div className='profile-github'>
                <h2 className='text-primary my-1'>
                  <i className='fab fa-github'></i> Github Repos
                </h2>
                {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};
ViewProfile.propTypes = {};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(ViewProfile);
