import React from "react";
import { Check, Crown } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

const Changed = () => {
  const navigate = useNavigate();
  return (
    <div className="changed-page payment-page report-page">
      <div className="top-header">
        <img
          src={require("../../assets/images/conguration.png")}
          alt="conguration"
        />
        <div className="box-center">
          <Crown />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>
      <h1 className="title">Поздравляем!</h1>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
      </p>
      <ul className="list">
        <h3>Разблокированные преимущества:</h3>
        {Array.from({ length: 5 }, (_, index) => (
          <li key={index}>
            <Check />
            <span>Lorem ipsum dolor</span>
          </li>
        ))}
      </ul>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
      </p>
      <button className="primary-btn" onClick={() => navigate("/")}>
        Начните изучать
      </button>
    </div>
  );
};

export default Changed;
