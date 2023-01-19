import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { upload } from "../features/AllcallSlice";
import { changeCal, postData } from "../features/CalSlice";
import { change } from "../features/YearSlice";


function MainPage() {
  const navigate = useNavigate();
  const currentMonth = useSelector((state) => state.month.currentMonth);
  const currentYear = useSelector((state) => state.year.currentYear);
  const user = useSelector((state) => state.user.user_id);
  const lastname = useSelector((state) => state.user.lastname);
  const callanders = useSelector((state) => state.cal.Allcall);
  const dispatch = useDispatch();
  const [pop, setPop] = useState(false);
  const [name, setName] = useState("");




  const clickHandler = () => {
    dispatch(postData(user, name, lastname));

    setPop(false);
    setName("");
  };
  const clickHandlerCal = async (index) => {
    dispatch(changeCal({ cal: callanders[index] }));
    dispatch(change(callanders[index].year));
    navigate(`/callander/${user}/${callanders[index].year}/${currentMonth}`);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };



  return (
    <div className="mainpage">
      {callanders.map((el, index) => {
        return el ? (
          <button key={index} onClick={() => clickHandlerCal(index)}>
            {el.name}
          </button>
        ) : null;
      })}
      <button onClick={() => setPop(true)}>Add Callander</button>
      {pop ? (
        <div className="namePurpose">
          <label>Name/Purpose of calendar</label>
          <input onChange={handleChange} value={name}></input>
          <button onClick={clickHandler}>Add</button>
        </div>
      ) : null}

      <button onClick={()=>navigate(`/callander/${user}/allCal`)}>All Event In One Calendar</button>
    </div>
  );
}

export default MainPage;
