import React, { useState } from "react";
import { addPost } from "../../redux/post/actions.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const UploadForm = ({ addPost, match }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setError("");
      handlePost(selected);
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  const handlePost = async (file) => {
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
    addPost({ image: dataRes.url }, match.params.id);
  };
  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
};

export default connect(null, { addPost })(withRouter(UploadForm));
