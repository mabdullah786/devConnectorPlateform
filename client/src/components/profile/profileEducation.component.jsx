import React from 'react';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, description },
}) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        <Moment format='YYY/MM/DD'>{from}</Moment> -
        {!to ? ' Now' : <Moment format='YYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> {fieldofstudy}
      </p>
      <p>{description}</p>
    </div>
  );
};

export default ProfileEducation;
