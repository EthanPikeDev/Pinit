import React, { Fragment, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ProfileInfo from "../components/profile/ProfileInfo";
import UploadForm from "../components/profile/UploadForm";
import { connect } from "react-redux";
import { getProfileById, clearProfile } from "../redux/profile/actions";
import { getUserPosts } from "../redux/post/actions";
import Spinner from "../components/spinner/Spinner";
import { motion } from "framer-motion";

const Profile = ({
  getProfileById,
  getUserPosts,
  profile: { profile, loading },
  auth,
  match,
  posts,
  clearProfile,
}) => {
  const height = useRef();
  useEffect(() => {
    getProfileById(match.params.id);
    getUserPosts(match.params.id);
    height.current.scrollTop = 0;

    return () => {
      clearProfile();
    };
  }, [getProfileById, getUserPosts, match.params.id]);

  return (
    <div ref={height}>
      {!loading && profile === null ? null : (
        <Fragment>
          {loading && profile === null ? (
            <Spinner />
          ) : (
            <Fragment>
              <ProfileInfo
                posts={posts.userPosts}
                profile={profile}
                auth={auth}
              />
              {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id ? (
                <h2 className='pictures-title'>Your Pictures</h2>
              ) : (
                <h2
                  style={{ textTransform: "capitalize", margin: "2rem auto" }}
                  className='pictures-title'
                >
                  {profile.user.name}'s Pictures
                </h2>
              )}

              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && <UploadForm />}

              {posts.loading && posts.userPosts === null ? (
                <Spinner />
              ) : (
                <Fragment>
                  {!posts.loading && posts.userPosts === null ? (
                    <h2>There is No Picture</h2>
                  ) : (
                    <div className='img-grid'>
                      {posts.userPosts &&
                        posts.userPosts.map((post) => (
                          <motion.div
                            key={post._id}
                            layout
                            whileHover={{ opacity: 1 }}
                            className='img-wraper'
                          >
                            <motion.img
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1 }}
                              src={post.image}
                              alt='pic'
                            />
                          </motion.div>
                        ))}
                    </div>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  userPosts: PropTypes.object,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  posts: state.posts,
});

export default connect(mapStateToProps, {
  getProfileById,
  getUserPosts,
  clearProfile,
})(Profile);
