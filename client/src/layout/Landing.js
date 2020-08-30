import React from "react";
import { ReactComponent as Logo } from "../assets/path.svg";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/posts" />;
  return (
    <div className="landing">
      <div className="img-container">
        <img src={require("../assets/lading.jpg")} alt="landing" />
      </div>
      <div className="landing-content">
        <Logo className="logo" />
        <h2>Share The Moment With Pinit</h2>
        <Link to="/login">Sign Up</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
