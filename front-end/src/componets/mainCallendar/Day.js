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
    dispatch(actions.changeData(cal[0].cal[month][id-1]))
    navigate(`/callander/${user}/${currentYear}/${month}/${id}`);
  };

  return (
    <div>
      {cal.map((el) => {
        return el.cal[month]
          .map((element) => {
            const key = `${element.month_Id}_${element.id}`;
            return (
              
              <button key={key} onClick={() => handleSubmit(element.id)}>
                {element.id}
               
                {
                  <ul>
                    {element.event.map((ele, index) => {
                      return ele == null ? null : <a key={index}>{ele.name}</a>;
                    })}
                  </ul>
                }
              </button>
            );
          });
      })}
    </div>
  );
}

export default Day;
