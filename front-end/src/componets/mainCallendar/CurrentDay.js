import { React, useState } from "react";
import { useSelector } from "react-redux";
import EventForm from "../Form/EventForm";
import PopUp from "./PopUp";

function CurrentDay() {
  const [pop, setPop]=useState([false,"",0])
  const day = useSelector((state) => state.day.dayData);
  return (
    <div>
      {day.event.length != 0 ? (
        day.event.map((ele, index) => {
          return ele == null ? null : (
           ele.time == true ? (
            <button key={index}>
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
      {pop[0] ? <PopUp setPop={setPop} pop={pop}/> : null }
      <EventForm />
    </div>
  );
}

export default CurrentDay;
