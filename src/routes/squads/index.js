import React from "react";
import Header from "../../components/header";
import { Link } from "react-router-dom";

const Squads = () => {
  return (
    <div className="squads-page report-page">
      <Header />
      <section>
        <h2 className="title">Lorem ipsum dolor sit amet,</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        </p>
        <div className="row">
          <Link className="primary" to={"/squads/search"}>Найти сквад</Link>
          <Link className="secondary" to={"/squads/new"}>Создать новый</Link>
        </div>
      </section>
    </div>
  );
};

export default Squads;
