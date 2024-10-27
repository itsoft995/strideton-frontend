import React from "react";
import { Link } from "react-router-dom";
import { Exchange, Menu } from "../assets/icons";

const Header = () => {
  return (
    <header className="global-header">
      <Link className="left-header-link" to={"/"}>
        <img
          src={require("../assets/images/start-page-primary.png")}
          alt="img"
        />
      </Link>
      <h1 className="logo-text">StrideTon</h1>
      <div className="right-header">
        <Link className="exchange-link" to={"/exchange"}>
          <Exchange />
        </Link>
        <Link to={"/menu"} className="menu-btn">
          <Menu />
        </Link>
      </div>
    </header>
  );
};

export default Header;
