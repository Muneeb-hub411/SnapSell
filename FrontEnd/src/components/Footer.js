import React from "react";

import { Link } from "react-router-dom";
// import "../index.css";

function footer() {
  return (
    <div className="footer">
      <h4 className="text-center">All Rights Reserved &copy; SnapSell</h4>
      <p className=" text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Policy</Link>
      </p>
    </div>
  );
}

export default footer;
