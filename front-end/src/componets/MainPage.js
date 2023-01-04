import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { upload } from '../features/AllcallSlice';
import { changeCal, postData } from '../features/CalSlice';
import Callendars from './Navi/Callendars';
import { change } from '../features/YearSlice';



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
        dispatch(upload([...callanders,cal]))

    }
    const clickHandlerCal=async (index)=> {
      dispatch(changeCal({cal: callanders[index], cal_id:index}))
      dispatch(change(callanders[index][0].year))
      navigate(`/callander/${user}/${callanders[index][0].year}/${currentMonth}`)
    }
  return (
    <div className='mainpage'>
        { callanders.map((el,index)=>{return <button key={index} onClick={()=>clickHandlerCal(index)}>{index}</button>}) }
        <button onClick={clickHandler}>Add Callander</button> 
    </div>
  )
}

export default MainPage