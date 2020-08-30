import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    profilePic,
    user: { name, _id },
  },
}) => {
  return (
    <div className='profile-item'>
      <div className='img-container'>
        {profilePic ? (
          <img src={profilePic} alt='pic' />
        ) : (
          <img src={require("../../assets/avatar.jpg")} alt='profile' />
        )}
      </div>
      <div className='name'>
        <span>{name}</span>
      </div>
      <Link to={`/profile/${_id}`}>View Profile</Link>
    </div>
  );
};

export default ProfileItem;
