import { React, useState } from "react";
import { useSelector } from "react-redux";
import EventForm from "../Form/EventForm";
import PopUp from "./PopUp";

function CurrentDay() {
  const [pop, setPop]=useState([false,"",0])
  const day = useSelector((state) => state.day.dayData);
  const cal = useSelector((state)=> state.cal.cal)
  const user_id = useSelector((state)=> state.user.user_id)

  const [file, setFile] = useState(null);
  const handleFileChange = e => setFile(e.target.files[0]);
  const [fileContent, setFileContent] = useState(null);

  const handleFileRead = e => {
    setFileContent(e.target.result);
  };
  const handleFileUpload = () => {
    const reader = new FileReader();
    reader.onloadend = handleFileRead;
    reader.readAsText(file);
  };

  return (
    <div>
      <a>Events: </a>
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
      )}{console.log(pop)}
      {cal.users ? <>
      {pop[0] && [cal.users.admin[0] ==user_id || cal.users.reader[0] == user_id ]  ? <PopUp setPop={setPop} pop={pop}/> : null }
      {cal.users.admin[0] ==user_id || cal.users.reader[0] == user_id ?  <EventForm name={"Add Event"} pop={pop} /> : null }</> : null}
      {cal.users.admin[0] ==user_id ? <div className="import_file">
        <a>Import event file shuold look like this "name:</a>
     <input type="file" onChange={handleFileChange} />
      {file ? <button onClick={handleFileUpload}>Upload</button> : null}
      {fileContent ? <p>{fileContent}</p> : null}
      </div> : null }
    </div>
  );
}

export default CurrentDay;
