import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { delete_profile_experience } from './../../store/actions/profile';

const Experience = ({ experiences, delete_profile_experience }) => {
  if (!experiences)
    return (
      <React.Fragment>
        <h1> Experiences List </h1>
        <div className='alert alert-warning' role='alert'>
          A simple warning alert—check it out!
        </div>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <h1> Experiences List </h1>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Company</th>
            <th scope='col'>Title</th>
            <th scope='col'>Year</th>
            <th scope='col'>DEL</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp, index) => (
            <tr key={exp._id}>
              <th scope='row'>{++index}</th>
              <td>{exp.company}</td>
              <td>{exp.title}</td>
              <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
                {!exp.to ? ' Now ' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
              </td>
              <td>
                <button
                  type='button'
                  onClick={(e) => delete_profile_experience(exp._id)}
                  className='btn btn-danger'
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

export default connect(null, { delete_profile_experience })(Experience);
