import {React,useState} from "react";
import { useFormik } from "formik";
import validate from "./validate";
import { useSelector, useDispatch } from "react-redux";
import { action } from "../../features/CalSlice";
import { actions } from "../../features/CurrentDaySlice";


const EventForm = () => {
  const currentMonth= useSelector((state)=> state.month.currentMonth)
  const cal = useSelector((state)=> state.cal.cal)
  const day = useSelector((state)=> state.day.dayData)
  const dispatch = useDispatch();
  const [allday,setAllday]= useState(false)
  const formik = useFormik({
    initialValues: {
      name: "",
      start: "",
      end: "",
      time: allday,
    },
    validate,

    onSubmit: (values) => {
      values.time=allday
      formik.handleReset();
      const changeMoonth=cal
      .filter((el, index) => index == day.month_Id)[0]
      .map((ele) => {
        if (ele.id === day.id) {
          
          const { id, month_Id, event } = ele;
          const event2 = []
          for(let i=0; i < event.length; i++){
            event2.push(event[i])
          }
          //nie można zmieniać event nie wiem dlaczego , musiałem utworzyć nowa tablice
          event2.push(values)
          dispatch(actions.changeData({month_Id,id, event: event2 }))
          return { month_Id,id, event: event2 };
        }
       
        return ele;
      })
      
      dispatch(
        action.change(cal.map((ele,index)=>index==currentMonth ? changeMoonth : ele))
      );
            console.log(cal)

    },
  });
  return (
    
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} >
      <h1>Add Event</h1>
      {formik.values.time}
      <label htmlFor="name"> Event Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name ? <div>{formik.errors.name}</div> : null}
    {!allday ? 
    <div>
      <label htmlFor="start">Time-Start</label>
      <input
              id="start"
              name="start"
              type="time"
              onChange={formik.handleChange}
              value={formik.values.start}
            />
        
      <label htmlFor="end">Time-end</label>
      <input
              id="end"
              name="end"
              type="time"
              onChange={formik.handleChange}
              value={formik.values.end}
            />
        {formik.errors.end ? <div>{formik.errors.end}</div> : null}
            </div>
    : <></>}
      <button type="button" onClick={()=> setAllday(!allday)}>AllDay</button>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
};

export default EventForm;
