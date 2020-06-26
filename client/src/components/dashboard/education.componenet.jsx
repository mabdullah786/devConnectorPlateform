import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { delete_profile_education } from '../../store/actions/profile';

const Education = ({ educations, delete_profile_education }) => {
  if (!educations)
    return (
      <React.Fragment>
        <h1> Education List </h1>
        <div className='alert alert-warning' role='alert'>
          A simple warning alert—check it out!
        </div>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <h1> Education List </h1>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>School</th>
            <th scope='col'>Degree</th>
            <th scope='col'>Year</th>
            <th scope='col'>DEL</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((exp, index) => (
            <tr key={exp._id}>
              <th scope='row'>{++index}</th>
              <td>{exp.school}</td>
              <td>{exp.degree}</td>
              <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
                {exp.to !== null ? <Moment format='YYYY/MM/DD'>{exp.from}</Moment> : ' Now '}
              </td>
              <td>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={(e) => delete_profile_education(exp._id)}
                >
                  Danger
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default connect(null, { delete_profile_education })(Education);
