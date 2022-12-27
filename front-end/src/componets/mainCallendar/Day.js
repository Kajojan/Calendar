import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../../features/CurrentDaySlice"


function Day() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user_id);

  const month = useSelector((state) => state.month.currentMonth);
  const currentYear = useSelector((state) => state.year.currentYear);
  const cal = useSelector((state) => state.cal.cal);
  const navigate = useNavigate();

  const handleSubmit = (id) => {
    dispatch(actions.change(id));
    dispatch(actions.changeData(cal[id-1]))
    navigate(`/callander/${user}/${currentYear}/${month}/${id}`);
  };

  return (
    <div>
      {" "}
      {cal.map((el) => {
        {console.log(el)}
            const key = `${el.month_Id}_${el.id}`;
            return (
              <button key={key} onClick={() => handleSubmit(el.id)}>
                {el.id}
                
                {
                  <ul>
                    {el.event.map((ele, index) => {
                      return <a key={index}>{ele.name}</a>;
                    })}
                  </ul>
                }
              </button>
            );
          
      })}
    </div>
  );
}

export default Day;
