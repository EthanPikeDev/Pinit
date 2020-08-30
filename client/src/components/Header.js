import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/auth/actions";

const Header = ({ logout, user }) => {
  return (
    <nav className="navbar">
      <div className="container flex">
        <Link to="/posts">
          <h2 className="navbar-logo">Pinit</h2>
        </Link>
        {user && (
          <ul className="navbar-links">
            <Link to={`/profile/${user._id}`}>Profile</Link>
            <Link to="/profiles">Users</Link>

            <Link to="/posts">Home</Link>

            <button onClick={() => logout()}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </ul>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Header);
