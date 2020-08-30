import React, { useEffect, Fragment } from "react";
import { getPosts } from "../redux/post/actions";
import { connect } from "react-redux";
import Spinner from "../components/spinner/Spinner";
import Post from "../components/posts/Post";

const Posts = ({ getPosts, post: { posts, loading }, user }) => {
  useEffect(() => {
    const getData = async () => {
      if (user) return await getPosts();
    };
    getData();
  }, [getPosts, user]);
  return (
    <Fragment>
      {!loading && posts === null ? (
        <h2>There is no post Yet</h2>
      ) : (
        <Fragment>
          {loading && posts === null ? (
            <Spinner />
          ) : (
            <Fragment>
              <div className='posts'>
                {posts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { getPosts })(Posts);
