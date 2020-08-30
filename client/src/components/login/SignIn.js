import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/auth/actions";
import Alert from "../Alert";

const SignIn = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email, password } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to='/posts' />;
  }
  return (
    <div className='form-container sign-in-container'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <Alert />
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          name='password'
          onChange={handleChange}
        />
        <a href='#!'>Forgot your password?</a>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(SignIn);
