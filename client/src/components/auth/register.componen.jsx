import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register_User } from '../../store/actions/auth';
import { set_alert } from '../../store/actions/alert';

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (password2 !== password) {
      props.set_alert('danger', ' Password Does not match');
    } else {
      props.register_User(formData);
    }
  };
  if (props.isAuthticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <React.Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmitForm(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </React.Fragment>
  );
};
Register.prototypes = {
  set_alert: PropTypes.func.required,
};

const mapStatToProps = (state) => ({
  isAuthticated: state.auth.isAuthticated,
});
const mapDispatchToProps = (dispatch) => {
  return {
    set_alert: (alertType, msg) => dispatch(set_alert(alertType, msg)),
    register_User: (formData) => dispatch(register_User(formData)),
  };
};

export default connect(mapStatToProps, mapDispatchToProps)(Register);