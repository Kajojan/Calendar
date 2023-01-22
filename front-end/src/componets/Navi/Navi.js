import React from "react";

import {Link} from "react-router-dom"

function Navi() {
  return (
    <div className="Navi">
      <Link to="/mainpage"> Home</Link>
      <Link to="/profile"> Profile</Link>
      {/* <Link to="/Notice"> Notice</Link> */}
      {/* <Link to="/Settings"> Settings</Link> */}


      {/* <Profile />
      <Callendars />
      <Notice />
      <Settings /> */}
    </div>
  );
}

export default Navi;
