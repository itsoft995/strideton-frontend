import React from "react";
import Header from "../../components/header";

const SquadsCreate = () => {
  const onSubmit = (formEvent) => {
    formEvent.preventDefault();
  };
  return (
    <div className="squads-page report-page">
      <Header />
      <form onSubmit={onSubmit}>
        <label>
          <span>Название сквада</span>
          <div className="input__box">
            <input type="text" placeholder="Название сквада" />
          </div>
        </label>
        <div className="row">
          <button className="primary" to={"/squads/search"}>
            Создать сквад
          </button>
        </div>
      </form>
    </div>
  );
};

export default SquadsCreate;
