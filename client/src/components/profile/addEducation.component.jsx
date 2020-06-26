import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { add_educ_to_profile } from './../../store/actions/profile';

const AddEducation = ({ add_educ_to_profile, history }) => {
  const [formData, SetExperience] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: '',
    description: '',
  });

  const [toDateDisable, toggleToDate] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChangeHanle = (e) => SetExperience({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    add_educ_to_profile(formData, history);
  };
  return (
    <section className='container'>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any Education that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* school Title'
            name='school'
            value={school}
            onChange={(e) => onChangeHanle(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree'
            name='degree'
            value={degree}
            onChange={(e) => onChangeHanle(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => onChangeHanle(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' name='from' value={from} onChange={(e) => onChangeHanle(e)} />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={(e) => {
                SetExperience({ ...formData, current: !current });
                toggleToDate(!toDateDisable);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChangeHanle(e)}
            disabled={toDateDisable}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            value={description}
            onChange={(e) => onChangeHanle(e)}
            cols='30'
            rows='5'
            placeholder='Job Description'
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};
const mapDispatchToProps = (dispatch) => ({
  add_educ_to_profile: (formData, history) => dispatch(add_educ_to_profile(formData, history)),
});
export default connect(null, mapDispatchToProps)(AddEducation);
