import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Check, LeftArrow, PlusIcon } from "../../assets/icons";

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

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [active, setAvtive] = useState(null);

  return (
    <div className="profile-page payment-method-page report-page">
      <div className="top">
        <header>
          <div className="navigation">
            <LeftArrow
              onClick={() => {
                if (
                  (window.history?.length && window.history.length > 1) ||
                  window.history.state?.idx
                ) {
                  navigate(-1);
                } else {
                  navigate("/", { replace: true });
                }
              }}
            />
            <span>Cпособы оплаты</span>
            <PlusIcon onClick={() => navigate("/payment-method/new")} />
          </div>
        </header>
        <ul className="methods">
          {methods.map((method) => (
            <li
              key={method.name}
              className={`method ${
                search ? (active === method.name ? "active" : "") : ""
              }`}
              onClick={() => setAvtive(method.name)}
            >
              <div className="left-side">
                <img src={method.image} alt={method.name} />
                <p>{method.name}</p>
              </div>
              {search ? (
                active === method.name ? (
                  <Check />
                ) : null
              ) : (
                <Link to={`/payment-method/${method.name}`}>Редактировать</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      {search ? (
        <div className="footer">
          <Link to={`/payment${search}`}>OK</Link>
        </div>
      ) : null}
    </div>
  );
};

export default PaymentMethod;
