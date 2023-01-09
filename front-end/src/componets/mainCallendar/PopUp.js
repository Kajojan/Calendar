import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  dellevent } from "../../features/CurrentDaySlice";

function PopUp({setPop,pop}) {
    const dispatch = useDispatch()
    const user_id = useSelector((state)=>state.user.user_id)
    const cal_id = useSelector((state)=>state.cal.cal_id)
    const month_id = useSelector((state)=>state.month.currentMonth)
    const day_id = useSelector((state)=>state.day.currentDay)
    const event_id = pop[2]
    const day = useSelector((state) => state.day.dayData);
    console.log(month_id,day_id,event_id)

    const clickHandler=()=>{
        console.log("usun")
        setPop([false,pop[1], pop[2]])
        dispatch(dellevent(user_id,cal_id,month_id,day_id,event_id))
    }
    
  return (
    <div className='PopUp'>
        <a>Do you want delete this event: {pop[1]} ? </a>
        <button key={"yes"} onClick={clickHandler}>yes</button>
        <button key={"no"} onClick={()=>setPop(false)}>no</button>
        
    </div>
  )
}

export default PopUp