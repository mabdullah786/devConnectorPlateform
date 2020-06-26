import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    location,
    skills,
    company,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img className='round-img' src={avatar} alt='' />
      <div>
        <h2>{name}</h2>
        <p>{status}</p>
        <p>{company}</p>
        <p>{location}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {skills.slice(0, 4).map((item, index) => (
          <li className='text-primary' key={index}>
            <i className='fas fa-check'></i> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
ProfileItem.propTypes = {};
export default ProfileItem;
