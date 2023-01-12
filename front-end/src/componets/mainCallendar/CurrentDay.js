import { React, useState } from "react";
import { useSelector } from "react-redux";
import EventForm from "../Form/EventForm";
import PopUp from "./PopUp";

function CurrentDay() {
  const [pop, setPop]=useState([false,"",0])
  const day = useSelector((state) => state.day.dayData);
  const cal = useSelector((state)=> state.cal.cal)
  const user_id = useSelector((state)=> state.user.user_id)

  return (
    <div>
      {day.event.length != 0 ? (
        day.event.map((ele, index) => {
          return ele == null ? null : (
           ele.time == true ? (
            <button key={index} onClick={()=>setPop([true,ele.name, index] )}>
              {ele.name}: All-Day {"   "}
            </button>
          ) : (
            <button key={index} onClick={()=>setPop([true,ele.name, index])}>
              {ele.name}: {ele.start}-{ele.end} {"   "}
            </button>
            
          )
          )
        })
      ) : (
        <a>None Of Event</a>
      )}
      {pop[0] && [cal.users.admin[0] ==user_id || cal.users.reader[0] == user_id ]  ? <PopUp setPop={setPop} pop={pop}/> : null }
      {cal.users.admin[0] ==user_id || cal.users.reader[0] == user_id ?  <EventForm /> : null }
    </div>
  );
}

export default CurrentDay;
