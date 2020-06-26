import React from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({ experience: { title, company, location, from, to, description } }) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {' '}
        <Moment format='YYY/MM?DD'>{from}</Moment> -{' '}
        {!to ? ' Now' : <Moment format='YYY/MM?DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}{' '}
      </p>
      <p>
        <strong>Location: </strong>
        {location}
      </p>
      <p>{description}</p>
    </div>
  );
};

export default ProfileExperience;
