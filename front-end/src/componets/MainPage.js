import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from '../features/AllcallSlice';
import { postData } from '../features/CalSlice';



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
 

  return (
    <div className='mainpage'>
        {  callanders.length > 0 ? callanders.map((el,index)=>{return <button onClick={()=>navigate(`/callander/${user}/${currentYear}/${currentMonth}`)}>{index}</button>}) : <button onClick={clickHandler}>Add Callander</button> }
    </div>
  )
}

export default MainPage