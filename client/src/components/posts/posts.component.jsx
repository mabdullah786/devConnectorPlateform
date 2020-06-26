import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PostItem from './postItem.component';
import Spinner from './../common/spinner.component';
import AddPost from './addPost.component';
import { get_postsList } from './../../store/actions/post';

const PostsCompnent = ({ posts: { posts, loading }, get_postsList }) => {
  useEffect(() => {
    get_postsList();
  }, [get_postsList]);

  return loading ? (
    <Spinner />
  ) : (
    <section className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>

      <AddPost />
      <div className='posts'>
        {posts.length > 0 ? (
          posts.map((post) => <PostItem post={post} key={post._id} />)
        ) : (
          <h1>No Post FOund</h1>
        )}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  posts: state.post,
});
export default connect(mapStateToProps, { get_postsList })(PostsCompnent);
