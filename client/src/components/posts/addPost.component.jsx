import React, { useState } from 'react';
import { connect } from 'react-redux';

import { add_post } from './../../store/actions/post';

const AddPost = ({ add_post }) => {
  const [post, setPost] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          add_post({ text: post });
          setPost('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder='Create a post'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default connect(null, { add_post })(AddPost);
