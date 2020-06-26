import React, { Fragment } from 'react';

const ProfileBio = ({ profile: { user, bio, skills } }) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{user.name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}

      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.map((item, index) => (
          <div key={index} className='p-1'>
            <i className='fa fa-check'></i> {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileBio;
