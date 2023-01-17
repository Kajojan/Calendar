import React from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loggedIn, logout } from "../../features/LoggedInSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
const ClickHandler= ()=>{
  dispatch(logout())
  dispatch(loggedIn())
  navigate("/")

}

  return (
    <div className="Profile">
      <button>Profile</button>

      <button onClick={ClickHandler}>Log Out</button>
    </div>
  );
}

export default Profile;
