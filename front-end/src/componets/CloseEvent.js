import React from "react";
import { useDispatch, useSelector } from "react-redux";

function CloseEvent() {
  const allCal = useSelector((state) => state.cal.Allcall);
  const month = useSelector((state) => state.month.currentMonth);
  const currentday = new Date().getDate();

  const connectArrays = allCal.reduce((acc, ele, index) => {
    ele.cal.map((ele2, index2) => {
      if (index == 0) {
        acc.push([]);
      }
      ele2.map((ele3, index3) => {
        if (index == 0) {
          acc[index2].push({ month_Id: ele3.month_Id, id: ele3.id, event: [] });
        }
        ele3.event.forEach((ele) => {
          acc[ele3.month_Id][ele3.id - 1].event.push(ele);
        });

        return acc;
      });
      return acc;
    });
    return acc;
  }, []);

  const event = connectArrays
    .slice(month, connectArrays.length)
    .reduce((acc, ele) => {
      ele.map((ele2, index) => {
        if (
          acc.length < 5 &&
          ele2.event.length > 0 &&
          (ele2.month_Id > month || ele2.id >= currentday)
        ) {
          acc.push(ele2);
        }
        return acc;
      });
      return acc;
    }, []);

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

  return (
    <div className="CloseEvent">
      <a>Your next Events </a>
      {event.map((ele, index) => {
        if (ele.event.length == 1) {
          return (
            <a key={index}>
              date: {monthNames[ele.month_Id]}-{ele.id} , time:{" "}
              {ele.event[0].time
                ? "AllDay"
                : (ele.event[0].start, ":", ele.event[0].end)}{" "},
              name: {ele.event[0].name} | 
            </a>
          );
        } else {
          return ele.event.map((ele2, index2) => {
            return (
              <a key={index2}>
                date: {monthNames[ele.month_Id]}: {ele.id} , time:{" "}
                {ele2.time ? "AllDay" : (ele2.start, ":", ele2.end)} |
              </a>
            );
          });
        }
      })}
    </div>
  );
}

export default CloseEvent;
