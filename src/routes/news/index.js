import React from "react";
import Header from "../../components/header";
import { Link } from "react-router-dom";

const News = () => {
  return (
    <div className="home-page">
      <Header />
      <section>
        <h2>Новости</h2>
        <section className="home-news">
          {Array.from({ length: 10 }, (_, index) => (
            <Link key={index} to={"/news/:id"} className="news-card">
              <div className="image-news">
                <img src={require("../../assets/images/news.png")} alt="news" />
              </div>
              <ul className="infos">
                <li className="date">13 Сентября</li>
                <li className="type">Новости</li>
                <li className="time">3 мин</li>
              </ul>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh
              </p>
            </Link>
          ))}
        </section>
      </section>
    </div>
  );
};

export default News;
