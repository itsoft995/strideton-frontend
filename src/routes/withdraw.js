import React, { useState } from "react";
import { LeftArrow } from "../assets/icons";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const navigate = useNavigate();
  const [approved, setApproved] = useState(false);
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="withdraw-page profile-page report-page">
      <div className="top">
        <div className="navigation">
          <LeftArrow
            onClick={() => (approved ? setApproved(false) : navigate("/menu"))}
          />
          <span>{approved ? "Подвтерждение" : "Вывод средств"}</span>
        </div>
        {approved ? (
          <>
            <div className="summ">
              <h1>1 000</h1>
              <p>$1 000 usd</p>
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
            <div className="row-bottom">
              <h2>Комиссия сети</h2>
              <span>2.5</span>
            </div>
          </>
        ) : (
          <>
            <label className="label">
              <span>Адрес</span>
              <div className="input-box">
                <input type="text" placeholder="Веддите адрес" />
              </div>
            </label>
            <label className="label">
              <span>Выберите сеть</span>
              <div className="input-box">
                <input type="text" placeholder="Ton" />
              </div>
            </label>
            <label className="label">
              <span>Сумма</span>
              <div className="input-box">
                <input type="text" placeholder="200" />
              </div>
            </label>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh !
            </p>
          </>
        )}
      </div>
      <div className="footer-section">
        {approved ? null : (
          <>
            <h2>Сохраненный адрес</h2>
            <div className="token-row">
              <img src={require("../assets/images/kaspi.png")} alt="kaspi" />
              <span>Cd8nZHAYFH7ZG8aJ1wfhCXhHuxzeRtqoB</span>
            </div>
          </>
        )}
        <div className="btn-section">
          {approved ? (
            <button onClick={() => setAccepted(true)}>Отправить</button>
          ) : (
            <button onClick={() => setApproved(true)}>Далее</button>
          )}
        </div>
      </div>
      {accepted ? (
        <div className="loading-full">
          <div className="loading-card">
            <div
              className="loader"
              style={{ "--loader-color": "#0098EA" }}
            ></div>
            <h3>Ваш вывод отправляется</h3>
            <p>Статус вашего вывода появится в истории транзакций</p>
            <button
              onClick={() => {
                setAccepted(false);
                setApproved(false);
              }}
            >
              Перейти на главную
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Withdraw;
