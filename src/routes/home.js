import React from "react";
import Start from "../components/startpage";
import Header from "../components/header";
import { Human, TGIcon } from "../assets/icons";
import { Link } from "react-router-dom";

const Home = () => {
  const userInfo =
    (localStorage.getItem("user_info") &&
      JSON.parse(localStorage.getItem("user_info"))) ||
    {};
  return (
    <div className="home-page">
      <Start />
      <Header />
      <div className="row-balances">
        <div className="balance-block">
          <img src={require("../assets/images/home-icon.png")} alt="home" />
          <span>0</span>
        </div>

        <div className="balance-block">
          <img src={require("../assets/images/wallet-icon.png")} alt="wallet" />
          <span>0</span>
        </div>
        <div className="balance-block">
          <img src={require("../assets/images/user-icon.png")} alt="user" />
          <span>{userInfo?.firstName}</span>
        </div>
      </div>

      <section className="home-categories">
        <h2>Выберите подходящюю категорию</h2>
        <div className="grid-cards">
          <Link to={"/pedometer?onfoot"} className="card">
            <div className="icon">
              <Human />
            </div>
            <h3>Пеши</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh
            </p>
          </Link>
          {/* <Link to={"/pedometer?pedestrian"} className="card">
            <div className="icon">
              <Human />
            </div>
            <h3>Режим Пешеход</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </Link>
          <Link to={"/avto-pedometer?bike"} className="card">
            <div className="icon">
              <img src={require("../assets/images/velo-icon.png")} alt="velo" />
            </div>
            <h3>Велосипет</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </Link>
          <Link to={"/avto-pedometer?scooter"} className="card">
            <div className="icon">
              <img
                src={require("../assets/images/samakat-icon.png")}
                alt="samakat"
              />
            </div>
            <h3>Самокат</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </Link>
          <Link to={"/avto-pedometer?auto"} className="card">
            <div className="icon">
              <img src={require("../assets/images/auto-icon.png")} alt="auto" />
            </div>
            <h3>Авто</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </Link> */}
        </div>
      </section>
      <section className="home-news">
        <div className="header-news-row">
          <h2>Новости</h2>
          <Link to={"/news"}>{"Смотреть все >"}</Link>
        </div>
        <Link to={"/news/:id"} className="news-card">
          <div className="image-news">
            <img src={require("../assets/images/news.png")} alt="news" />
          </div>
          <ul className="infos">
            <li className="date">13 Сентября</li>
            <li className="type">Новости</li>
            <li className="time">3 мин</li>
          </ul>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh
          </p>
        </Link>
      </section>

      <section className="member-section">
        <h2>
          Станте часть движения <br /> <span>StrideTon</span>
        </h2>
      </section>
      <section className="ads-section">
        <div className="card primary">
          <p className="title">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          </p>
          <button className="btn">
            <TGIcon /> <span>Канал</span>
          </button>
        </div>
        <div className="card secondary">
          <p className="title">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          </p>
          <button className="btn">
            <span>Поддержка</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
