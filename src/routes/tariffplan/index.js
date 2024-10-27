import React, { useState } from "react";
import { CheckIcon, LeftArrow } from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";

const TariffPlan = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  return (
    <div className="tariff-page profile-page report-page">
      <div className="top-section">
        <div className="navigation">
          <LeftArrow onClick={() => navigate("/menu")} />
          <span>Улучшить тариф</span>
        </div>
        <div className="tab">
          {Array.from({ length: 3 }, (_, index) => (
            <button
              key={index}
              onClick={() => setTab(index)}
              className={`tab-btn ${tab === index ? "active" : ""}`}
            >
              <span>Lorem</span>
            </button>
          ))}
        </div>
        <div className="tariff-cards">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              style={{
                transform: `translateX(calc(-${tab * 100}%))`,
              }}
              className="tariff-card"
            >
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
          ))}
        </div>
      </div>
      <footer className="footer-section">
        <Link to={'/payment-method?payment=tarif'}>Продолжить</Link>
      </footer>
    </div>
  );
};

export default TariffPlan;
