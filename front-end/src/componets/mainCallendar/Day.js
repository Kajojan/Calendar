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

  const handleSubmit = (id) => {
    dispatch(actions.change(id));
    dispatch(actions.changeData(cal.cal[month][id - 1]));
    navigate(`/callander/${user}/${currentYear}/${month}/${id}`);
  };
  const clickhandler = (a) => {
    setdays(a)
  };

  return (
    <div>
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
