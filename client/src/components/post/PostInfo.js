import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import RelativeTime from "react-relative-time";
import { connect } from "react-redux";
import PostComment from "./PostComment";
import { addComment, deletePost } from "../../redux/post/actions";

const PostInfo = ({
  post,
  history,
  deletePost,
  addComment,
  auth: { user },
}) => {
  const comments = useRef();
  const [comment, setComment] = useState("");
  useEffect(() => {
    comments.current.scrollTop = comments.current.scrollHeight;
  }, [comments]);
  const onSubmit = (e) => {
    let full;
    e.preventDefault();
    addComment(post._id, comment, (full = true));
    setComment("");
    setTimeout(() => {
      comments.current.scrollTop = comments.current.scrollHeight;
    }, 500);
  };
  return (
    <div className='post-information'>
      {user._id === post.user && (
        <button
          onClick={() => deletePost(post._id, history)}
          className='delete-post'
        >
          <i className='fas fa-trash'></i> Delete Post
        </button>
      )}
      <div className='infor'>
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
      <div ref={comments} className='comments'>
        {!post.comments.length > 0 ? (
          <div className='no-comment'>There is No comment</div>
        ) : (
          post.comments.map((comment) => (
            <PostComment key={comment._id} post={post} comment={comment} />
          ))
        )}
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
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addComment, deletePost })(
  withRouter(PostInfo)
);
