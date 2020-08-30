import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { deleteProfile, handleFollowing } from "../../redux/profile/actions";
import { connect } from "react-redux";

const ProfileInfo = ({
  profile,
  auth,
  posts,
  deleteProfile,
  handleFollowing,
}) => {
  return (
    <section className='profile-section'>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <div className='profile-modification'>
            <Link to='/edit-profile' className='edit'>
              <i className='fas fa-edit'></i>Edit
            </Link>
            <button onClick={() => deleteProfile()} className='delete-post'>
              <i className='fas fa-trash'></i> Delete Profile
            </button>
          </div>
        )}

      <div className='profile-info-container'>
        <div className='profile-image'>
          {profile.profilePic ? (
            <img src={profile.profilePic} alt='pic' />
          ) : (
            <img src={require("../../assets/avatar.jpg")} alt='pic' />
          )}
        </div>
        <div className='profile-info'>
          <div className='name'>
            <p>
              {profile.user.name}{" "}
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id !== profile.user._id && (
                  <Fragment>
                    {profile.followers.filter(
                      (follow) => follow.user === auth.user._id
                    ).length > 0 ? (
                      <button
                        className='unfollow'
                        onClick={() => handleFollowing(profile.user._id)}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className='follow'
                        onClick={() => handleFollowing(profile.user._id)}
                      >
                        Follow
                      </button>
                    )}
                  </Fragment>
                )}
            </p>
          </div>
          <div className='info'>
            <span>{posts.length} Posts</span>
            <span>{profile.following.length} Following</span>
            <span>{profile.followers.length} Followers </span>
          </div>
          <div className='age'>
            {profile.age && (
              <span>
                {" "}
                <span className='profile-key'>age:</span> {profile.age}
              </span>
            )}
          </div>
          <div className='age'>
            {profile.location && (
              <span>
                {" "}
                <span className='profile-key'>location:</span>{" "}
                {profile.location}
              </span>
            )}
          </div>
          <div className='age'>
            {profile.website && (
              <span>
                {" "}
                <span className='profile-key'>website: </span>
                {profile.website}
              </span>
            )}
          </div>
          <div className='bio'>
            {profile.bio && (
              <p className='lead'>
                {" "}
                <span className='profile-key'>bio:</span> {profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(null, { deleteProfile, handleFollowing })(ProfileInfo);
