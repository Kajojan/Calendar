import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../../features/CurrentDaySlice";

function Day() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user_id);
  const [days, setdays] = useState(32);

  const month = useSelector((state) => state.month.currentMonth);
  const currentYear = useSelector((state) => state.year.currentYear);
  const cal = useSelector((state) => state.cal.cal);
  const navigate = useNavigate();
  const [search, setSearch] = useState('')
  const [data, setData]=useState([])
  const [click, setClick]=useState(false)

  const handleSubmit = (id) => {
    dispatch(actions.change(id));
    dispatch(actions.changeData(cal.cal[month][id - 1]));
    navigate(`/callander/${user}/${currentYear}/${month}/${id}`);
  };
  const clickhandler = (a) => {
    setdays(a)
  };
  const searchhandler=(event)=>{
    setClick(false)
    setSearch(event.target.value)

  }
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
  const Clicksearch=()=>{
    const events=[]
    cal.cal.map((ele,index)=>{
       ele.map((ele2,index2)=>{
          if(ele2.event.length > 0 ){
              ele2.event.forEach(element=>{
                if(element.name.toLowerCase() == search.toLowerCase() ){ events.push([element, ele2]) }
              })
          }
      })
    })
    setData(events)
    setClick(true)

  }
 
  return (
    <div>
      <div className="search">
      <input type="search" placeholder="Search event" value={search} onChange={searchhandler}></input>
      <button onClick={Clicksearch}>Search</button>
      <div className="searchEvents">
        {data.length > 0 ? (data.map((ele,index)=>{
          return <a key={index}>{ele[0].name}-{ele[0].time ? "AllDay" : ele[0].start - ele[0].end}, date: {monthNames[ele[1].month_Id]}, {ele[1].id} </a>
        })): click ? <a>Not found "{search}"</a>: null}
        </div>
      </div>
      <button onClick={() => clickhandler(7)}>Week view</button>
      <button onClick={() => clickhandler(32)}>Month view</button>

      {cal.cal[month].map((el,index) => {
        if(index < days){
        const key = `${el.month_Id}_${el.id}`;
        return (
          <button key={key} onClick={() => handleSubmit(el.id)}>
            {el.id}
            {
              <ul>
                {el.event.map((ele, index) => {
                  return ele == null ? null : <a key={index}>{ele.name}</a>;
                })}
              </ul>
            }
          </button>
        );
          }
      })}
    </div>
  );
}

export default Day;


