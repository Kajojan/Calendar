import { React, useState } from "react";
import { useSelector } from "react-redux";
import EventForm from "../Form/EventForm";
import PopUp from "./PopUp";
import "../../scss/currentDay.scss";
import axios from "axios";

function CurrentDay() {
  const [pop, setPop] = useState([false, "", 0]);
  const day = useSelector((state) => state.day.dayData);
  const cal = useSelector((state) => state.cal.cal);
  const user_id = useSelector((state) => state.user.user_id);
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
  const dayOfWeek=(day, month, year) =>{

    var weekDay = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    month -= 1;
    if (month < 1 ) {
      month += 12;
      year -= 1;
    }
  
    var century = Math.floor(year / 100);

    year %= 100;

    
    return weekDay[
      (Math.floor((26 * month - 2) / 10) +
        day +
        year +
        Math.floor(year / 4) +
        Math.floor(century / 4) +
        5 * century) %
        7
    ]
  }

  

  return (
    <div className="currentDay">
      <h1>{day.id} {monthNames[day.month_Id]} {cal.year}</h1>
      <h3>{dayOfWeek(day.id,day.month_Id, cal.year)}</h3>
      <div className="Event">
        
      <a>Events: </a> <br/>
      {day.event.length != 0 ? (
        day.event.map((ele, index) => {
          return ele == null ? null : ele.time == true ? (
            <button key={index} onClick={() => setPop([true, ele.name, index])}>
              {ele.name}: All-Day {"   "}
            </button>
          ) : (
            <button key={index} onClick={() => setPop([true, ele.name, index])}>
              {ele.name}: {ele.start}-{ele.end} {"   "}
            </button>
          );
        })
      ) : (
        <a>None Of Event</a>
      )}
      </div>
      {!Array.isArray(cal.users) ? (
        <>
          {pop[0] && (
            cal.users.admin.find(ele => ele[0] === user_id) != undefined   || (cal.users.reader.length > 0 && cal.users.reader.find(ele => ele[0] === user_id) != undefined  )) ? (
            <PopUp setPop={setPop} pop={pop} />
          ) : null}
          {(cal.users.admin.find(ele => ele[0] === user_id) != undefined || (cal.users.reader.length > 0 && cal.users.reader.find(ele => ele[0] === user_id) != undefined ) ) && !pop[0]? (
            <EventForm name={"Add Event"} pop={pop} />
          ) : null}
        </>
      ) : null}
      {/* {!Array.isArray(cal.users) && cal.users.admin[0][0] == user_id  ? (
        <div className="import_file">
          
          {file ? <button onClick={handleFileRead}>Upload</button> : null}
          {fileContent ? <p>{fileContent.cal_id}</p> : null}
        </div>
      ) : null} */}
    </div>
  );
}

export default CurrentDay;
