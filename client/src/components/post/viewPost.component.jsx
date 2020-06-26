import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { get_singlePost } from './../../store/actions/post';
import PostItem from './../posts/postItem.component';
import Spinner from '../common/spinner.component';
import { Link } from 'react-router-dom';
import CommentForm from './commentForm';
import CommentItem from './commentItem';

const ViewPost = ({ get_singlePost, post: { post, loading }, match }) => {
  useEffect(() => {
    get_singlePost(match.params.id);
  }, [get_singlePost, match.params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts'>
        <button type='button' className='btn btn-warning'>
          {' '}
          Go Back
        </button>
      </Link>

      {!post.comments || !post._id ? (
        ' No Post Found'
      ) : (
        <div>
          <PostItem post={post} showActions={false} />
          <div className='comments'>
            <CommentForm postId={post._id} />
            {post.comments.map((comment, index) => (
              <CommentItem key={index} comment={comment} postId={post._id} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { get_singlePost })(ViewPost);
