import React, { Fragment } from "react";
import RelativeTime from "react-relative-time";
import { handleLike } from "../../redux/post/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { addComment } from "../../redux/post/actions";

const Post = ({ post, handleLike, auth, addComment, history }) => {
  const [comment, setComment] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    addComment(post._id, comment, null);
    setComment("");
  };
  return (
    <div className='post'>
      <div className='post-header'>
        <div
          onClick={() => history.push(`/profile/${post.user}`)}
          className='info'
        >
          {post.profilePic ? (
            <img src={post.profilePic} alt='profile' />
          ) : (
            <img src={require("../../assets/avatar.jpg")} alt='profile' />
          )}

          <span>{post.name}</span>
        </div>
        <p>
          <RelativeTime value={`${post.createdAt}`} titleformat='iso8601' />
        </p>
      </div>
      <div
        onClick={() => history.push(`/post/${post._id}`)}
        className='post-image'
      >
        <img src={post.image} alt='' />
      </div>
      <div className='post-fotter'>
        <div className='icons'>
          <span>
            <Fragment>
              {post.likes.filter((like) => like.user === auth.user._id).length >
              0 ? (
                <i
                  onClick={() => handleLike(post._id)}
                  style={{ color: "red" }}
                  className='fas fa-heart'
                ></i>
              ) : (
                <i
                  onClick={() => handleLike(post._id)}
                  className='far fa-heart'
                ></i>
              )}
            </Fragment>
            {"   "}
            <span style={{ margin: "5px", fontSize: "18px" }}>
              {post.likes.length ? post.likes.length : null}
            </span>
          </span>
          <span>
            <i
              onClick={() => history.push(`/post/${post._id}`)}
              className='far fa-comment'
            ></i>
            {"   "}
            <span style={{ margin: "5px", fontSize: "18px" }}>
              {post.comments.length ? post.comments.length : null}
            </span>
          </span>
        </div>
        <form onSubmit={onSubmit} className='post-comment'>
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            type='text'
            placeholder='Add a comment...'
          />
          <input type='submit' style={{ display: "none" }} />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { handleLike, addComment })(
  withRouter(Post)
);
