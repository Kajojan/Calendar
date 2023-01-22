import React from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loggedIn, logout } from "../../features/LoggedInSlice";
import { raport } from "../../features/UserSlice";

function Profile() {
  const navigate = useNavigate();
  const id = useSelector((state)=>state.user.user_id)
  const name = useSelector((state)=>state.user.name)
  const lastName = useSelector((state)=>state.user.lastname)
  const email = useSelector((state)=>state.user.email)
  const dispatch = useDispatch()
  const User_raport = useSelector((state)=>state.user.raport)

const ClickHandler= ()=>{
  dispatch(logout())
  dispatch(loggedIn())
  navigate("/")

}


  const handleDownload = () => {
    const url = '/home/kajojan/ProjektBazy/projektprogramistyczny-Kajojan/back-end/routes/cal.js';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cal.js';
    link.click();
  }

  const generateRaport=()=>{
    dispatch(raport(id))
  }


  return (
    <div className="Profile">
      <div className="Info">
        <a>Name: {name} </a>
        <a>Last name: {lastName}  </a>
        <a>email : {email}  </a>
        <a>Your unique id : {id} </a>
      </div>
      <div className="Raports">
        <button onClick={generateRaport}>Generate Raports</button>
        
      <button onClick={handleDownload}>Downloand you Raport </button>
      </div>

      <button onClick={ClickHandler}>Log Out</button>
    </div>
  );
}

export default Profile;
