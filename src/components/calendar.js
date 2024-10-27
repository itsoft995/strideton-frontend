import React from "react";
import { ArrowDown } from "../assets/icons";
import ProgressCircle from "./progressCircle";

const Calendar = () => {
  return (
    <div className="custome-calendar">
      <div className="header-calendar">
        <div className="navigations">
          <button className="navigation-btn btn-prev">
            <ArrowDown />
          </button>
          <span className="inner-date">декабрь 2024 г.</span>
          <button className="navigation-btn btn-next">
            <ArrowDown />
          </button>
        </div>
        <div className="weekdays">
          <span>Вс</span>
          <span>Пн</span>
          <span>Вт</span>
          <span>Ср</span>
          <span>Чт</span>
          <span>Пт</span>
          <span>Сб</span>
        </div>
      </div>
      <div className="dates-calendar">
        {Array.from({ length: 35 }, (_, index) => (
          <div className="day-calendar" key={index}>
            <ProgressCircle
              progress={Math.floor(Math.random() * 101)}
              date={index + 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
