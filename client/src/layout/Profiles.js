import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../redux/profile/actions";
import ProfileItem from "../components/profiles/ProfileItem";
import Spinner from "../components/spinner/Spinner";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <div className='profiles'>
      <h2 style={{ margin: "1.5rem", fontSize: "1.4rem" }}>Profiles</h2>
      {loading || !profiles ? (
        <Spinner />
      ) : (
        <div className='profiles-grid'>
          {profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
