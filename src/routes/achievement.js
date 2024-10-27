import React, { useState } from "react";
import { LeftArrow } from "../assets/icons";
import { Link } from "react-router-dom";
const Achievement = () => {
  const [conguration, setConguration] = useState(false);
  return (
    <div className="achievement-page report-page">
      <header>
        <img
          src={require("../assets/images/achievements-bg.png")}
          alt="achievements"
          className="achievements-header"
        />
        <div className="info-header">
          <Link to={'/'}  className="navigation">
            <LeftArrow />
            <span>Достижения</span>
          </Link>
          <div className="trofey">
            <img
              className="trofey-image"
              src={require("../assets/images/trofey.png")}
              alt="trofey"
            />
            <div className="level">Уровень 9</div>
            <p className="description">Вы прошли 200 000 шагов!</p>
          </div>
        </div>
      </header>
      <div className="achievements">
        {Array.from({ length: 21 }, (_, index) => (
          <div
            className="card"
            key={index}
            onClick={() => setConguration(true)}
          >
            <img
              className="trofey-image"
              src={require("../assets/images/trofey.png")}
              alt="trofey"
            />
            <div className="level">Уровень {index + 1}</div>
            <p className="status">Вы прошли уровень</p>
          </div>
        ))}
      </div>
      {conguration ? (
        <div className="loading-full modal-conguration">
          <img
            src={require("../assets/images/conguration.png")}
            className="conguration-image"
            alt="conguration"
          />

          <div className="loading-card">
            <img
              src={require("../assets/images/trofey.png")}
              alt="achievements"
              className="trofey-modal"
            />
            <h3>Вы достигли 10-го уровня!</h3>
            <p>
              Поздравляем! Вы сделали колоссальные 250 000 шагов. Продолжайте в
              том же духе!
            </p>
            <button onClick={() => setConguration(false)}>OK, Sure!</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Achievement;
