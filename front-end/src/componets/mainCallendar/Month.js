import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Next, Prev } from "../../features/MonthSlice";
import { useNavigate } from "react-router-dom";
import CalSettings from "./CalSettings";

function Month() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pop,setpop]=useState(false)
  const currentMonth = useSelector((state) => state.month.currentMonth);
  const currentYear = useSelector((state) => state.year.currentYear);
  const user = useSelector((state) => state.user.user_id);

  const monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecie",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

  const handleSubmit = (f) => {
    dispatch(f());
    navigate(
      `/callander/${user}/${currentYear}/${f == Prev ? currentMonth - 1 : currentMonth + 1}`
    );
  };
  return (
    <div>
      <button onClick={()=>setpop(true)}>Cal Settings</button>
      {pop ? <CalSettings setpop={setpop}/> : null}
      {currentYear}
      {currentMonth > 0 ? (
        <button onClick={() => handleSubmit(Prev)}>prev month</button>
      ) : (
        <></>
      )}
      {
        <button onClick={() => console.log(currentMonth)}>
          {monthNames[currentMonth]}
        </button>
      }
      {currentMonth < 11 ? (
        <button onClick={() => handleSubmit(Next)}>next month</button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Month;
