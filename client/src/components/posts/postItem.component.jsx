import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import { post_Dislike, post_like, post_deleted } from './../../store/actions/post';

const PostItem = ({
  auth,
  post: { avatar, likes, _id, date, comments, name, text, user },
  post_Dislike,
  post_like,
  post_deleted,
  showActions,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user._id}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>{' '}
        </p>

        {showActions && (
          <Fragment>
            <button onClick={(e) => post_like(_id)} type='button' className='btn btn-light'>
              <i className='fas fa-thumbs-up'></i>
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button type='button' onClick={(e) => post_Dislike(_id)} className='btn btn-light'>
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && <span className='comment-count'>{comments.length} </span>}
            </Link>
            {!auth.loading && (auth.user._id === user._id || auth.user._id === user) && (
              <button onClick={(e) => post_deleted(_id)} type='button' className='btn btn-danger'>
                <i className='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const connectComponent = connect(mapStateToProps, { post_like, post_Dislike, post_deleted });
export default connectComponent(PostItem);
