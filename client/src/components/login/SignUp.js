import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/auth/actions";
import Alert from "../Alert";

const SignUp = ({ isAuthenticated, registerUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { name, email, password } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(name, email, password);
  };
  if (isAuthenticated) {
    return <Redirect to='/edit-profile' />;
  }
  return (
    <div className='form-container sign-up-container'>
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className='social-container'>
          <a href='#!' className='social'>
            <i className='fab fa-facebook-f'></i>
          </a>
          <a href='#!' className='social'>
            <i className='fab fa-google-plus-g'></i>
          </a>
          <a href='#!' className='social'>
            <i className='fab fa-linkedin-in'></i>
          </a>
        </div>
        <span>or use your email for registration</span>
        <Alert />
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser })(SignUp);
