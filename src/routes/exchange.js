import React, { useState } from "react";
import { ExchangeIcon, LeftArrow } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";

const Exchange = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="exchange-page home-page">
      <div className="top-page">
        <Link to={"/"} className="header-exchange">
          <LeftArrow />
          <h2>Обмен</h2>
        </Link>
        <label className="label">
          <span>Шаги</span>
          <div className="input-box">
            <input type="number" placeholder="0" />
          </div>
        </label>
        <button className="exchanger">
          <ExchangeIcon />
        </button>
        <label className="label">
          <span>Сумма токенов</span>
          <div className="input-box">
            <input type="number" placeholder="100" />
            <button className="max-number">Max</button>
          </div>
        </label>
      </div>
      <div className="footer-page">
        <button onClick={() => setLoading(true)}>Подтверждение</button>
      </div>
      {loading ? (
        <div className="loading-full">
          <div className="loading-card">
            <div
              className="loader"
              style={{ "--loader-color": "#0098EA" }}
            ></div>
            <h3>Ожидание обмена...</h3>
            <button onClick={() => navigate('/exchange/status')} className="next-btn">
              Далее
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Exchange;
