import {
  START_AUTH_CALL,
  SET_AUTH_USER_SUCCESSFUL,
  SET_AUTH_USER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
} from '../types/auth';
import { ACCOUNT_DELETED } from '../types/profile';

export const AUTH_INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthticated: false,
  loading: true,
  user: null,
};

const authReducer = (state = AUTH_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTH_USER_SUCCESSFUL:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthticated: true,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthticated: true,
      };
    case SET_AUTH_USER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_USER:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthticated: false,
        token: null,
        user: null,
      };
    case START_AUTH_CALL:
      return { ...AUTH_INITIAL_STATE };
    default:
      return state;
  }
};

export default authReducer;
