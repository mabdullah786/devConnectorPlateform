import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import { comment_deleted } from '../../store/actions/post';

const CommentItem = ({
  comment_deleted,
  auth,
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => comment_deleted(postId, _id)}
            type='button'
            className='btn btn-danger'
          >
            Danger
          </button>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { comment_deleted })(CommentItem);
