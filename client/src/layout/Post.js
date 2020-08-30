import React, { useEffect, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost, clearPost } from "../redux/post/actions";
import PostInfo from "../components/post/PostInfo";
import Spinner from "../components/spinner/Spinner";

const Post = ({ getPost, match, clearPost, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id);
    return () => {
      clearPost();
    };
  }, [getPost, match.params.id]);

  return (
    <Fragment>
      {!loading && post === null ? (
        <h1></h1>
      ) : (
        <Fragment>
          {loading && post === null ? (
            <Spinner />
          ) : (
            <Fragment>
              <Link className='post-link' to='/posts'>
                <i className='far fa-arrow-alt-circle-left'></i>Posts
              </Link>
              <div className='post-fluid'>
                <div className='post-image'>
                  <img src={post.image} alt='pic' />
                </div>
                <PostInfo key={post._id} post={post} />
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.posts,
});

export default connect(mapStateToProps, { getPost, clearPost })(
  withRouter(Post)
);
