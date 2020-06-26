import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  PROFILE_CLEAR,
  PROFILE_LIST,
  PROFILE_GITHUBREPOS,
} from '../types/profile';
import axios from 'axios';
import { set_alert } from './alert';
import { GET_ALL_REPOS } from './../types/profile';

export const get_userProfile = () => async ({ dispatch }) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Create or Update Profile
export const create_or_update_Profile = (formData, history, edit = false) => async ({
  dispatch,
}) => {
  try {
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('/api/profile', formData, header);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });

    dispatch(set_alert('success', edit ? 'Profile Created' : 'Profile Updated'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    const { errors } = error.response && error.response.data;

    if (errors) {
      errors.map((error) => dispatch(set_alert('danger', error.msg)));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// ADD experiences to  Profile
export const add_experience_to_profile = (formData, history) => async ({ dispatch }) => {
  try {
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put('/api/profile/experience', formData, header);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });

    dispatch(set_alert('success', 'Experience to Profile added'));
    history.push('/dashboard');
  } catch (error) {
    const { errors } = error.response && error.response.data;

    if (errors) {
      errors.map((error) => dispatch(set_alert('danger', error.msg)));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Add Education Profile
export const add_educ_to_profile = (formData, history) => async ({ dispatch }) => {
  try {
    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.put('/api/profile/education', formData, header);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });

    dispatch(set_alert('success', ' Education to Profile has been Added'));
    history.push('/dashboard');
  } catch (error) {
    const { errors } = error.response && error.response.data;

    if (errors) {
      errors.map((error) => dispatch(set_alert('danger', error.msg)));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Delete Experience of Profile
export const delete_profile_experience = (id) => async ({ dispatch }) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(set_alert('success', 'Experience has been Delete'));
  } catch (error) {
    dispatch(set_alert('danger', 'Something Event Wrong'));

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Delete Education of Profile
export const delete_profile_education = (id) => async ({ dispatch }) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(set_alert('success', 'Education has been Delete'));
  } catch (error) {
    dispatch(set_alert('danger', 'Something Event Wrong'));

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Delete Profile
export const delete_profile = () => async ({ dispatch }) => {
  if (window.confirm(' Are u Sure')) {
    try {
      await axios.delete(`/api/profile`);

      dispatch({
        type: PROFILE_CLEAR,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(set_alert('primary', 'Profile Has Been Deleted'));
    } catch (error) {
      dispatch(set_alert('danger', 'Something Event Wrong'));

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          error: error.response.status,
        },
      });
    }
  }
};

// Get All profiles list
export const get_allprofilesList = () => async ({ dispatch }) => {
  dispatch({
    type: PROFILE_CLEAR,
  });

  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: PROFILE_LIST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response,
        error: error.response,
      },
    });
  }
};

// Get Profile by Id
export const getProfileById = (id) => async ({ dispatch }) => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
   
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Get  ALl githun repos
export const getListOfRepos = (username) => async ({ dispatch }) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_ALL_REPOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(set_alert('danger', 'Something Event Wrong'));
    dispatch({
      type: PROFILE_GITHUBREPOS,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};
