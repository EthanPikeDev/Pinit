import React from "react";
import { ReactComponent as SVG } from "../assets/notfound.svg";

const NotFound = () => {
  return (
    <div className='page-notfound'>
      <SVG className='svg' />
      <h2 className='pictures-title'>Sorry This Page Doesn't exist</h2>
    </div>
  );
};

export default NotFound;
