import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postData , error} from '../../features/CalSlice'

function CalSettings({setpop}) {
  const dispatch=useDispatch()
  const cal = useSelector((state)=>state.cal.cal)
  const user_id = useSelector((state)=>state.user.user_id)
  const cal_id = useSelector((state)=>state.cal.cal_id)
  const errorMsg = useSelector((state)=> state.cal.error)
  const [input, setinput] = useState('')

  useEffect(()=>{
    if(errorMsg.status == false){
      setinput("")
    }
  },[errorMsg])

  const handleChange = (event) => {
    setinput(event.target.value);
  };
  const clickHandler=()=>{
    setpop(false)
  }
  const DataHandler=()=>{ 
    if(cal[0].users.includes(input)){
      dispatch(error({status:true, data:"User is already in this calendar "}))
    }else if(input == ""){
      dispatch(error({status:true,data:"Input user_id"}))
    }else{
      dispatch(postData(input,[{...cal[0], users:[...cal[0].users,input]}],user_id,cal_id,))
    }
  }
  return (
    <div className='CalSettings'>
        <div className='users'>
          <a>Users list: </a>
        {cal[0].users.map((el,index)=>{return <button key={index}>{el}</button>})}
        </div>
        <div className='add_users'>
          <label>Enter user ID:</label>
            <input onChange={handleChange} value={input}></input>
            <button onClick={DataHandler}>Add User</button>
            {errorMsg.status ? <a>{errorMsg.data}</a>: null}
        </div>
        <button onClick={clickHandler}>Close</button>
    </div>
  )
}

export default CalSettings