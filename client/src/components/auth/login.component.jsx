import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login_User } from './../../store/actions/auth';

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    props.login_User(formData);
  };

  if (props.isAuthticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <React.Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign In </h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Login Your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmitForm(e)}>
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

          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/register'>Sign Up</Link>
        </p>
      </section>
    </React.Fragment>
  );
};

const mapStatToProps = (state) => ({
  isAuthticated: state.auth.isAuthticated,
});
const mapDispatchTopProps = (dispatch) => {
  return {
    login_User: (formData) => dispatch(login_User(formData)),
  };
};
const connectComponent = connect(mapStatToProps, mapDispatchTopProps);

export default connectComponent(Login);
