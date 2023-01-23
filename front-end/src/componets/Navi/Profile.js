import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, logout } from "../../features/LoggedInSlice";
import { raport, raportChange } from "../../features/UserSlice";
import "../../scss/profile.scss";
import FileSaver from "file-saver";

function Profile() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.user_id);
  const name = useSelector((state) => state.user.name);
  const lastName = useSelector((state) => state.user.lastname);
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  const User_raport = useSelector((state) => state.user.raportChange);

  const ClickHandler = () => {
    dispatch(logout());
    dispatch(loggedIn());
    navigate("/");
  };

  const handleDownload = () => {
    const data = User_raport.user.reduce((acc, ele) => {
      acc += `cal_id : ${ele.cal_id} \n users: \n admin: ${ele.count_admin} \n reader: ${ele.count_reader} \n spec: ${ele.count_spec} \n`;
      User_raport.event.map((ele2, index) => {
        if (ele2._id == ele.cal_id) {
          console.log(ele2)
          acc += `events: ${ele2.eventCount} \n`;
        }
        return acc
      });
      return acc
    }, "");

    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "raport.txt");
  };

  const generateRaport = () => {
    dispatch(raport(id));
  };

  return (
    <div className="Profile">
      <div className="Info">
        <a>Name: {name} </a>
        <a>Last name: {lastName} </a>
        <a>email : {email} </a>
        <a>Your unique id : {id} </a>
      </div>
      <div className="Raports">
        <button onClick={generateRaport}>Generate Raports</button>
        {User_raport != undefined
          ? User_raport.user.map((ele, index) => {
              return (
                <div className="Raport_cal" key={index}>
                  <a>cal_id: {ele.cal_id}</a>
                  <ul>
                    users:
                    <li>admin: {ele.count_admin}</li>
                    <li>reader: {ele.count_reader}</li>
                    <li>spectetor: {ele.count_spec}</li>
                  </ul>
                  {User_raport.event.map((ele2, index) => {
                    if (ele2._id == ele.cal_id) {
                      return <a key={index}> events: {ele2.eventCount} </a>;
                    }
                  })}
                </div>
              );
            })
          : null}
        <button onClick={handleDownload}>Downloand you Raport </button>
      </div>

      <button  className="LogOut" onClick={ClickHandler}>Log Out</button>
    </div>
  );
}

export default Profile;
