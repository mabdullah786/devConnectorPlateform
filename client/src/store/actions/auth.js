import {
  SET_AUTH_USER_SUCCESSFUL,
  SET_AUTH_USER_FAIL,
  START_AUTH_CALL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
} from '../types/auth';
import axios from 'axios';
import { set_alert } from './alert';
import setAuthToken from './../../utils/setAuthToken';

export const load_user = () => async ({ dispatch }) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register_User = ({ name, email, password }) => async ({ dispatch }) => {
  dispatch({ type: START_AUTH_CALL });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const responce = await axios.post('/api/users', body, config);

    dispatch({
      type: SET_AUTH_USER_SUCCESSFUL,
      payload: responce.data,
    });
    dispatch(load_user());
  } catch (error) {
    const { errors } = error.response.data;

    if (errors) {
      errors.map((error) => dispatch(set_alert('danger', error.msg)));
    }
    dispatch({
      type: SET_AUTH_USER_FAIL,
    });
  }
};

// lOgin User

export const login_User = ({ email, password }) => async ({ dispatch }) => {
  dispatch({ type: START_AUTH_CALL });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const responce = await axios.post('/api/auth', body, config);


    dispatch({
      type: LOGIN_SUCCESS,
      payload: responce.data,
    });
    dispatch(load_user());
  } catch (error) {
    const { errors } = error.response.data;

    if (errors) {
      errors.map((error) => dispatch(set_alert('danger', error.msg)));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout_user = () => ({ dispatch }) => {
  return dispatch({
    type: LOGOUT_USER,
  });
};
