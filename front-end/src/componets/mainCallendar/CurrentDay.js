import {React,useState} from "react";
import { useSelector } from "react-redux";
import EventForm from "../Form/EventForm";


function CurrentDay() {
  const day = useSelector((state) => state.day.dayData);
  return (
    <div>
      {day.event.length != 0  ? day.event.map((ele, index) => {
      return   ele.time == true ?  <a key={index}>{ele.name}: All-Day  {"   "}</a>
      :  <a key={index}>{ele.name}: {ele.start}-{ele.end}  {"   "}</a>;

      }): <a>None Of Event</a>}
      {console.log(day)}
      <EventForm />

    </div>
  );
}

export default CurrentDay;
