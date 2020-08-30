import React, { useState, useEffect } from "react";
import { getCurrentProfile, createProfile } from "../../redux/profile/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const EditProfile = ({
  history,
  getCurrentProfile,
  createProfile,
  profile: { profile, loading },
}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const types = ["image/png", "image/jpeg"];
  const [formData, setFormData] = useState({
    profilePic: "",
    age: "",
    location: "",
    website: "",
    bio: "",
  });
  useEffect(() => {
    getCurrentProfile();
    setFormData({
      age: loading || !profile.age ? "" : profile.age,
      location: loading || !profile.location ? "" : profile.location,
      website: loading || !profile.website ? "" : profile.website,
      bio: loading || !profile.bio ? "" : profile.bio,
      profilePic: loading || !profile.profilePic ? "" : profile.profilePic,
    });
    setError("");
  }, [getCurrentProfile, loading]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  const { age, location, website, bio } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dxagz60ac");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxagz60ac/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const dataRes = await res.json();
      formData.profilePic = dataRes.url;
    }
    createProfile(formData, history, profile.user._id);
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="file-img">
          <h2>Upload a Profile picture</h2>
          <label>
            <input type="file" onChange={handleFileChange} />
            <span>+</span>
          </label>
          {file && <div className="output">{file.name}</div>}
          {error && (
            <div style={{ color: "red" }} className="error">
              {error}
            </div>
          )}
        </div>
        <div className="form-groupe">
          <label>age</label>
          <input type="number" name="age" value={age} onChange={handleChange} />
        </div>
        <div className="form-groupe">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </div>
        <div className="form-groupe">
          <label>website</label>
          <input
            type="text"
            name="website"
            value={website}
            onChange={handleChange}
          />
        </div>
        <div className="form-groupe">
          <label>bio</label>
          <textarea
            name="bio"
            cols="30"
            rows="5"
            value={bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(
  withRouter(EditProfile)
);
