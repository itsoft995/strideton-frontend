import React from "react";
import Header from "../../components/header";

const Single = () => {
  return (
    <div className="home-page">
      <Header />
      <section>
        <h2>Новости</h2>
        <section className="home-news">
          <div className="news-card">
            <div className="image-news">
              <img src={require("../../assets/images/news.png")} alt="news" />
            </div>
            <ul className="infos">
              <li className="date">13 Сентября</li>
              <li className="type">Новости</li>
              <li className="time">3 мин</li>
            </ul>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut
            </p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Single;
