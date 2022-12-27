import {React,useState} from "react";
import EventForm from "../Form/EventForm";
import { useSelector } from "react-redux";
import TimePicker from 'react-time-picker';


function CurrentDay() {
  const [value, onChange] = useState('10:00');
  const day = useSelector((state) => state.day.dayData);
 
  return (
    <div>
      {day.event.length != 0  ? day.event.map((ele, index) => {
      return   ele.time == true ?  <a key={index}>{ele.name}: All-Day  {"   "}</a>
      :  <a key={index}>{ele.name}: {ele.start}-{ele.end}  {"   "}</a>;

      }): <a>None Of Event</a>}
      <EventForm />

    </div>
  );
}

export default CurrentDay;
