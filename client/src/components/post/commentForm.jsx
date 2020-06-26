import React, { useState } from 'react';
import { connect } from 'react-redux';

import { add_comment } from './../../store/actions/post';

const CommentForm = ({ postId, add_comment }) => {
  const [post, setPost] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment....</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          add_comment(postId, { text: post });
          setPost('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder='Create a Comment'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default connect(null, { add_comment })(CommentForm);
