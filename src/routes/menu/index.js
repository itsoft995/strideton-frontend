import React, { useState } from "react";
import {
  ArrowDown,
  CloseSvg,
  DocsIcon,
  HistoriesIcon,
  LogOutIcon,
  PaymentIcon,
  SheetIcon,
  StarIcon,
  UserIcon,
  WithDrawIcon,
} from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";

const links = [
  {
    link: "/profile",
    label: "Личная информация",
    icon: <UserIcon />,
  },
  {
    link: "/payment-method",
    label: "Способ обплаты",
    icon: <PaymentIcon />,
  },
  {
    link: "/faq",
    label: "FAQ",
    icon: <StarIcon />,
  },
  {
    link: "/legal",
    label: "Legal",
    icon: <SheetIcon />,
  },
  {
    link: "/support",
    label: "Помощь",
    icon: <DocsIcon />,
  },
  {
    link: "/withdraw",
    label: "Вывод средств",
    icon: <WithDrawIcon />,
  },
  {
    link: "/withdraw-history",
    label: "История выводов",
    icon: <HistoriesIcon />,
  },
];

const MenuPage = () => {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  return (
    <div className="menu-page report-page">
      <header>
        <div
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
          className="navigation"
        >
          <CloseSvg />
          <span>Профиль</span>
        </div>
      </header>
      <Link to={"/tarif-plan"} className="tarif-block">
        <img src={require("../../assets/images/tarif.png")} alt="tarif" />
        <div className="column">
          <h4>Тарифный план</h4>
          <span>
            Наслаждайтесь всеми преимуществами и изучите больше возможностей
          </span>
        </div>
      </Link>
      <Link to={"/achievement"} className="tarif-block level">
        <div className="left-row">
          <img src={require("../../assets/images/trofey.png")} alt="trofey" />
          <div className="column">
            <h4>Уровень 9</h4>
            <span>Вы восходящая звезда!</span>
          </div>
        </div>
        <div className="icon">
          <ArrowDown />
        </div>
      </Link>
      <div className="links">
        {links.map((link) => (
          <Link key={link.label} to={link.link} className="link">
            <div className="left-side">
              {link.icon}
              <span>{link.label}</span>
            </div>
            <ArrowDown className="arrow" />
          </Link>
        ))}

        <div className="link logout-link" onClick={() => setLogout(true)}>
          <div className="left-side">
            <LogOutIcon />
            <span>Logout</span>
          </div>
        </div>
      </div>
      {logout && (
        <div className="loading-full">
          <div className="lang-change log-out-body">
            <h4>Выход</h4>
            <p>Вы уверены, что хотите выйти?</p>
            <div className="row-btn">
              <button onClick={() => setLogout(false)} className="secondary">
                Отмена
              </button>
              <button onClick={() => setLogout(false)} className="primary">
                Да, выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
