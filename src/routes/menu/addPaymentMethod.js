import React from "react";
import { useNavigate } from "react-router-dom";
import { LeftArrow } from "../../assets/icons";

const methods = [
  {
    name: "Tonkeeper",
    image: require("../../assets/images/tonkeeper.png"),
  },
  {
    name: "Trust Wallet",
    image: require("../../assets/images/trust-wallet.png"),
  },
  {
    name: "Kaspi",
    image: require("../../assets/images/kaspi.png"),
  },
  {
    name: "SBP",
    image: require("../../assets/images/sbp.png"),
  },
  {
    name: "Visa",
    image: require("../../assets/images/visa.png"),
  },
  {
    name: "Mir",
    image: require("../../assets/images/mir.png"),
  },
];

const AddPaymentMethod = () => {
  const navigate = useNavigate();
  return (
    <div className="profile-page add-payment-method-page  report-page">
      <div className="top-section">
        <header>
          <div className="navigation">
            <LeftArrow
              onClick={() => navigate("/payment-method")}
            />
            <span>Добавить способ оплаты</span>
          </div>
        </header>
        <label className="label">
          <span>Номер карты</span>
          <div className="input-box">
            <input type="text" placeholder="2640 4763 7569 8456" />
          </div>
        </label>
        <label className="label">
          <span>Имя владельца </span>
          <div className="input-box">
            <input type="text" placeholder="Andrew Ainsley" />
          </div>
        </label>
        <div className="row-form">
          <label className="label">
            <span>ММ/ГГ </span>
            <div className="input-box">
              <input type="text" placeholder="06/28" />
            </div>
          </label>
          <label className="label">
            <span>CVV </span>
            <div className="input-box">
              <input type="text" placeholder="475" />
            </div>
          </label>
        </div>
        <section className="methods-support">
          <h2>Поддерживаемые платежи:</h2>
          <div className="methods-supported">
            {methods.map((method) => (
              <img key={method.name} src={method.image} alt={method.name} />
            ))}
          </div>
        </section>
      </div>
      <div className="footer-section">
        <button>Сохранить</button>
      </div>
    </div>
  );
};

export default AddPaymentMethod;
