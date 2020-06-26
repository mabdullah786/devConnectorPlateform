import {
  GET_PROFILE,
  PROFILE_ERROR,
  PROFILE_CLEAR,
  UPDATE_PROFILE,
  GET_ALL_REPOS,
  PROFILE_LIST,
  PROFILE_GITHUBREPOS,
} from '../types/profile';
import { LOGOUT_USER } from '../types/auth';

export const INITIAL_STATE_PROFILE = {
  profile: null,
  profiles: [],
  loading: true,
  repos: [],
  error: {},
};

const profileReducer = (state = INITIAL_STATE_PROFILE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {},
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        error: payload,
      };
    case PROFILE_LIST:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };
    case PROFILE_GITHUBREPOS:
      return {
        ...state,
        loading: false,
        repos: [],
      };
    case GET_ALL_REPOS:
      return {
        ...state,
        loading: false,
        repos: payload,
      };
    case PROFILE_CLEAR:
    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        profile: null,
        profiles: [],
        repos: [],
        error: {},
      };
    default:
      return state;
  }
};
export default profileReducer;
