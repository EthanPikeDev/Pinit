import React from "react";

const OverlayRight = ({ setPanelActive }) => {
  return (
    <div className="overlay-panel overlay-right">
      <h1>New to Pinit?</h1>
      <p>Continue below to sign up.</p>
      <button className="ghost" onClick={() => setPanelActive(true)}>
        Sign Up
      </button>
    </div>
  );
};

export default OverlayRight;
