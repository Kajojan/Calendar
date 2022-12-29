import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../features/AllcallSlice';
import { action, postData } from '../features/CalSlice';
import Callendars from './Navi/Callendars';



function MainPage() {
    const navigate = useNavigate();
    const currentMonth = useSelector((state) => state.month.currentMonth);
    const currentYear = useSelector((state) => state.year.currentYear);
    const user = useSelector((state)=> state.user.user_id)
    const cal = useSelector((state) => state.cal.cal);
    const callanders = useSelector((state) => state.allcal.Allcall);
    const dispatch = useDispatch()
    const clickHandler=()=>{
        dispatch(postData(user))
        navigate(`/callander/${user}/${currentYear}/${currentMonth}`)
    }
    const clickHandlerCal=(index)=>{
      dispatch(action.change(callanders[index]))
      navigate(`/callander/${user}/${currentYear}/${currentMonth}`)
    }
  return (
    <div className='mainpage'>
        {  callanders.length > 0 ? callanders.map((el,index)=>{return <button key={index} onClick={()=>clickHandlerCal(index)}>{index}</button>}) : <button onClick={clickHandler}>Add Callander</button> }
    </div>
  )
}

export default MainPage