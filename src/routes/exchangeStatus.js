import React from "react";
import { LeftArrow, SupportIcon } from "../assets/icons";
import { Link } from "react-router-dom";

const ExchangeStaus = () => {
  return (
    <div className="exchange-page home-page">
      <div className="top-page">
        <Link to={"/exchange"} className="header-exchange">
          <LeftArrow />
          <h2>Обмен</h2>
        </Link>
        <div className="card-status">
          <div className="top-card">
            <h3>Обмен</h3>
            <Link className="support-link">
              <SupportIcon />
              <span>Поддержка</span>
            </Link>
          </div>
          <div className="line"></div>
          <ul>
            <li>
              <span className="property">Сумма</span>
              <span className="value">1000</span>
            </li>
            <li>
              <span className="property">Цена</span>
              <span className="value">10$</span>
            </li>
            <li>
              <span className="property">Общее количество</span>
              <span className="value">1000</span>
            </li>
            <li>
              <span className="property">Комиссии за транзакции</span>
              <span className="value">1</span>
            </li>
            <li>
              <span className="property">Ордер №</span>
              <span className="value">1000</span>
            </li>
            <li>
              <span className="property">Время ордера</span>
              <span className="value">2024-09-16 02:25:20</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExchangeStaus;
