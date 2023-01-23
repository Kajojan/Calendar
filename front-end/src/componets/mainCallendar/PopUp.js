import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  dellevent } from "../../features/CurrentDaySlice";
import EventForm from '../Form/EventForm';

function PopUp({setPop,pop}) {
    const dispatch = useDispatch()
    const user_id = useSelector((state)=>state.user.user_id)
    const cal = useSelector((state)=>state.cal.cal)
    const month_id = useSelector((state)=>state.month.currentMonth)
    const day_id = useSelector((state)=>state.day.currentDay)
    const event_id = pop[2]
    const day = useSelector((state) => state.day.dayData);

    const clickHandler=()=>{
        setPop([false,pop[1], pop[2]])
        dispatch(dellevent(user_id,cal.cal_id,month_id,day_id,event_id))
    }
    
  return (
    <div className='PopUp'>
      <div className='editPopUp'>
            <EventForm name={"Update Event"} pop={pop}/>
          </div>
      <div className='deletePopUp'>
        <a>Do you want delete this event: {pop[1]} ? </a>
        <button className="yes" onClick={clickHandler}>yes</button>
        <button className='no' onClick={()=>setPop(false)}>no</button>
        </div>
        
    </div>
  )
}

export default PopUp