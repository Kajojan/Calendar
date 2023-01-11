import { React, useState } from "react";
import { useFormik } from "formik";
import validate from "./validate";
import { useSelector, useDispatch } from "react-redux";
import { actions , postEvent} from "../../features/CurrentDaySlice";

const EventForm = () => {
  const currentMonth = useSelector((state) => state.month.currentMonth);
  const user = useSelector((state) => state.user.user_id);
  const day = useSelector((state) => state.day.dayData);
  const cal = useSelector((state)=>state.cal.cal)
  const day_id = useSelector((state) => state.day.currentDay);
  const cal_id = cal.cal_id
  console.log(cal_id)
  const dispatch = useDispatch();
  const [allday, setAllday] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      start: "",
      end: "",
      time: allday,
    },
    validate,

    onSubmit: (values) => {
      values.time = allday;
      formik.handleReset();
      dispatch(postEvent(user, cal_id, currentMonth, day_id - 1, values));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <h1>Add Event</h1>
      {formik.values.time}
      <label htmlFor="name"> Event Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.errors.name ? <div>{formik.errors.name}</div> : null}
      {!allday ? (
        <div>
          <label htmlFor="start">Time-Start</label>
          <input
            id="start"
            name="start"
            type="time"
            onChange={formik.handleChange}
            value={formik.values.start}
          />

          <label htmlFor="end">Time-end</label>
          <input
            id="end"
            name="end"
            type="time"
            onChange={formik.handleChange}
            value={formik.values.end}
          />
          {formik.errors.end ? <div>{formik.errors.end}</div> : null}
        </div>
      ) : (
        <></>
      )}
      <button type="button" onClick={() => setAllday(!allday)}>
        AllDay
      </button>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
};

export default EventForm;
