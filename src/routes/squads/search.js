import React from "react";
import Header from "../../components/header";
import { Link } from "react-router-dom";

const SquadsSearch = () => {
  return (
    <div className="squads-page report-page">
      <Header />
      <div className="list-of-cards">
        {Array.from({ length: 15 }, (_, index) => (
          <div className="card" key={index}>
            <span className="badge">№{index + 1}</span>
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
            <Link to={`/squads/details/${index + 1}`} className="hyperlink">Подробно</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquadsSearch;
