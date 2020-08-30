import React, { useState } from "react";
import SignUp from "../components/login/SignUp";
import SignIn from "../components/login/SignIn";
import OverlayLeft from "../components/login/OverlayLeft";
import OverlayRight from "../components/login/OverlayRight";

const Login = () => {
  const [panelActive, setPanelActive] = useState(false);
  return (
    <div className='body'>
      <div
        className={
          panelActive ? "container-login right-panel-active" : "container-login"
        }
      >
        <SignUp />
        <SignIn />
        <div className='overlay-container'>
          <div className='overlay'>
            <OverlayLeft setPanelActive={setPanelActive} />
            <OverlayRight setPanelActive={setPanelActive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
