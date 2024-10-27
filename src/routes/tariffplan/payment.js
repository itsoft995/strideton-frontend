import React, { useState } from "react";
import { CheckIcon, LeftArrow } from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="profile-page payment-page report-page">
      <div className="top">
        <header>
          <div className="navigation">
            <LeftArrow onClick={() => navigate(-1)} />
            <span>Обзор тарифа</span>
          </div>
        </header>
        <div className="tariff-cards">
          <div className="tariff-card">
            <h3 className="card-title">Lorem ipsum dolor</h3>
            <h5 className="card-price">
              ₽0<span className="badge"> / Lorem</span>
            </h5>
            <ul className="options-tariff">
              {Array.from({ length: 5 }, (_, index) => (
                <li key={index}>
                  <CheckIcon />
                  <span>Lorem ipsum dolor</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="selected-payment">
          <h3>Selected Payment Method</h3>
          <div className="methods">
            <li className={`method`}>
              <div className="left-side">
                <img
                  src={require("../../assets/images/tonkeeper.png")}
                  alt={"tonkeeper"}
                />
                <p>Tonkeeper</p>
              </div>

              <Link to={`/payment-method?payment=tarif`}>Сменить</Link>
            </li>
          </div>
        </div>
      </div>
      <div className="footer-page">
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              navigate("/tariff-changed");
            }, 1000);
          }}
        >
          Подтвердить оплату - 5 000₽
        </button>
      </div>
      {loading ? (
        <div className="loading-full">
          <div className="loading-card">
            <div
              className="loader"
              style={{ "--loader-color": "#0098EA" }}
            ></div>
            <h3>Обработка платежа...</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Payment;
