import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postData, error, delCal } from "../../features/CalSlice";

function CalSettings({ setpop }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cal = useSelector((state) => state.cal.cal);
  const user_id = useSelector((state) => state.user.user_id);
  const cal_id = cal.cal_id
  const errorMsg = useSelector((state) => state.cal.error);
  const [input, setinput] = useState("");
  const [sure, setSure] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (errorMsg.status == false) {
      setinput("");
    }
  }, [errorMsg]);

  const handleChange = (event) => {
    setinput(event.target.value);
    
  };
  const selectHandler=(event)=>{
    setRole(event.target.value)
    console.log(event.target.value)
  }
  const clickHandler = () => {
    setpop(false);
  };
  const DataHandler = () => {
    if (cal.users[role].includes(input)) {
      dispatch(
        error({ status: true, data: "User is already in this calendar " })
      );
    } else if (input == "") {
      dispatch(error({ status: true, data: "Input user_id" }));
    } else {
      dispatch(postData(input,cal.name, cal, user_id, cal_id, role));
    }
  };

  const sureHandler = () => {
    dispatch(delCal(user_id, cal_id));
    navigate("/mainpage");
  };

  return (
    <div className="CalSettings">
      {/* <div className="users">
        <a>Users list: </a>
        <button>admin: {cal.users.admin} </button>

        {cal.users.reder.map((el, index) => {
          return <button key={index}>reader {el[1]}</button>;
        })}
        {cal.users.spec.map((el, index) => {
          return <button key={index}>spectaitor {el[1]}</button>;
        })}
      </div> */}
      <div className="add_users">
        <label>Enter user ID:</label>
        <input onChange={handleChange} value={input}></input>
        <select  onChange={selectHandler}>
          <option value="admin">Admin</option>
          <option value="reader">Reader</option>
          <option value="spec">Spectator</option>
        </select>
        <button onClick={DataHandler}>Add User</button>
        {errorMsg.status ? <a>{errorMsg.data}</a> : null}
      </div>

      <button onClick={() => setSure(true)}>Delete this calendar</button>
      {sure ? (
        <div className="sure">
          <a>Are you sure to delete this calendar?</a>
          <button onClick={sureHandler}>Yes</button>
          <button onClick={() => setSure(false)}>No</button>
        </div>
      ) : null}

      <button onClick={clickHandler}>Close</button>
    </div>
  );
}

export default CalSettings;
