import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";

const SingleDetails = () => {
  return (
    <div className="squads-page report-page">
      <Header />
      <div className="list-of-cards">
        <div className="card single-card">
          <span className="badge">№1</span>
          <h3 className="title-card">Lorem ipsum</h3>
          <ul>
            <li>
              <span className="property">шаги</span>
              <span className="value">500 000</span>
            </li>
            <li>
              <span className="property">время</span>
              <span className="value">140ч 59м</span>
            </li>
            <li>
              <span className="property">энергия</span>
              <span className="value">1 500 000</span>
            </li>
            <li>
              <span className="property">км</span>
              <span className="value">1 500</span>
            </li>
          </ul>
          <div className="row">
            <Link to={`/squads/search`} className="hyperlink secondary">
              Назад
            </Link>
            <Link to={`/achievement`} className="hyperlink primary">
              Вступить
            </Link>
          </div>
          <h4>Список пользователей</h4>
          <div className="users">
            {Array.from({ length: 30 }, (_, index) => (
              <p key={index}>{index + 1}. @usernaim</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDetails;
