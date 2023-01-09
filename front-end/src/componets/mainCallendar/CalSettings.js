import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postData , error} from '../../features/CalSlice'

function CalSettings({setpop}) {
  const dispatch=useDispatch()
  const cal = useSelector((state)=>state.cal.cal)
  const errorMsg = useSelector((state)=> state.cal.error)
  const [input, setinput] = useState('')

  useEffect(()=>{
    if(errorMsg == null){
      setinput("")
      dispatch(error(null))
    }
  },[error])

  const handleChange = (event) => {
    setinput(event.target.value);
  };
  const clickHandler=()=>{
    setpop(false)
  }
  const DataHandler=()=>{ 
    dispatch(postData(input,[{...cal[0], users:[cal[0].users,input]}]))
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
            {errorMsg != null ? <a>{errorMsg}</a>: null}
        </div>
        <button onClick={clickHandler}>Close</button>
    </div>
  )
}

export default CalSettings