import React from "react";
import { connect } from "react-redux";
import { removeComment } from "../../redux/post/actions";

const PostComment = ({ comment, post, auth, removeComment }) => {
  return (
    <div className='comment'>
      <div className='comment-img'>
        <img src={comment.profilePic} alt='' />
      </div>
      <div className='comment-text'>
        <span>{comment.name}</span>
        <br />
        <p>{comment.text}</p>
      </div>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === comment.user && (
          <button
            onClick={() => removeComment(post._id, comment._id)}
            className='remove-btn'
          >
            <i className='fas fa-times'></i>
          </button>
        )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(PostComment);
