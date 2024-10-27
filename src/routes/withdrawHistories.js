import React from "react";
import { useNavigate } from "react-router-dom";
import { LeftArrow } from "../assets/icons";

const WithdrawHistories = () => {
  const navigate = useNavigate();
  return (
    <div className="withdraw-histories-page profile-page report-page">
      <div className="navigation">
        <LeftArrow onClick={() => navigate("/menu")} />
        <span>История выводов</span>
      </div>
      <section>
        <div className="date">
            <span>Сегодня 16:00</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="card-top">
              <span>Lorem</span>
              <span>1 000</span>
            </div>
            <h2>От</h2>
            <div className="token-row">
              <img src={require("../assets/images/kaspi.png")} alt="kaspi" />
              <span>Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
            </div>
            <h2>Кому</h2>
            <div className="token-row">
              <img src={require("../assets/images/kaspi.png")} alt="kaspi" />
              <span>Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
            </div>
            <div className="bottom-card">
              <h2>Комиссия сети</h2>
              <span>2.5</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="date">
            <span>Вчера 12:00</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="card-top">
              <span>Lorem</span>
              <span>1 000</span>
            </div>
            <h2>От</h2>
            <div className="token-row">
              <img src={require("../assets/images/kaspi.png")} alt="kaspi" />
              <span>Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
            </div>
            <h2>Кому</h2>
            <div className="token-row">
              <img src={require("../assets/images/kaspi.png")} alt="kaspi" />
              <span>Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
            </div>
            <div className="bottom-card">
              <h2>Комиссия сети</h2>
              <span>2.5</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="date">
            <span>Вчера 12:00</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="card-top">
              <span>Lorem</span>
              <span>1 000</span>
            </div>
            <h2>От</h2>
            <div className="token-row">
              <img src={require("../assets/images/kaspi.png")} alt="kaspi" />
              <span>Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
            </div>
            <h2>Кому</h2>
            <div className="token-row">
              <img src={require("../assets/images/kaspi.png")} alt="kaspi" />
              <span>Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
            </div>
            <div className="bottom-card">
              <h2>Комиссия сети</h2>
              <span>2.5</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WithdrawHistories;
