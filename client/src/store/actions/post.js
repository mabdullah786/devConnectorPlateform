import {
  GET_POSTS,
  POSTS_ERROR,
  POST_LIKE_UPDATA,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../types/post';
import axios from 'axios';
import { set_alert } from './alert';
import { POST_DELETED } from './../types/post';

export const get_postsList = () => async ({ dispatch }) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Post Like
export const post_like = (postId) => async ({ dispatch }) => {
  try {
    const res = await axios.put(`api/posts/like/${postId}`);
    dispatch({
      type: POST_LIKE_UPDATA,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch(set_alert('danger', 'You Already Like '));
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Post post_Dislike
export const post_Dislike = (postId) => async ({ dispatch }) => {
  try {
    const res = await axios.put(`api/posts/unlike/${postId}`);
    dispatch({
      type: POST_LIKE_UPDATA,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    dispatch(set_alert('danger', 'You Already DIS Like '));
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Post Delete
export const post_deleted = (postId) => async ({ dispatch }) => {
  try {
    await axios.delete(`api/posts/${postId}`);
    dispatch({
      type: POST_DELETED,
      payload: postId,
    });
    dispatch(set_alert('success', 'Post Delteed and removed '));
  } catch (error) {
    dispatch(set_alert('danger', 'You Not Authorized '));

    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Post ADD
export const add_post = (formData) => async ({ dispatch }) => {
  try {
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };
    const res = await axios.post(`api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(set_alert('success', 'Post Added Successfully '));
  } catch (error) {
    dispatch(set_alert('danger', 'SomeThing Went Wronf ' + error.message));
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Get Single Post
export const get_singlePost = (id) => async ({ dispatch }) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Comment  ADD
export const add_comment = (postId, formData) => async ({ dispatch }) => {
  try {
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(set_alert('success', 'Comment Added Successfully '));
  } catch (error) {
    dispatch(set_alert('danger', 'SomeThing Went Wrong ' + error.message));
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.response.statusText,
        error: error.response.status,
      },
    });
  }
};

// Comment  Delete
export const comment_deleted = (postId, commentId) => async ({ dispatch }) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(set_alert('success', 'Comment Delteed and removed '));
  } catch (error) {
    dispatch(set_alert('danger', error.message));

    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: error.message,
      },
    });
  }
};
