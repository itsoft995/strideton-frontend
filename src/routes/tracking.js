import React, { useState, useEffect } from "react";
import Header from "../components/header";
import {
  FireIcon,
  FooterGeo,
  GPSIcon,
  People,
  TimeIcon,
} from "../assets/icons";
import LocationMap from "../components/MyLoaction";
const Tracking = () => {
  const [status, setStatus] = useState(false);
  const userInfo =
    (localStorage.getItem("user_info") &&
      JSON.parse(localStorage.getItem("user_info"))) ||
    {};
  return (
    <div className="tracking-page">
      <Header />
      <section className="iframe-section">
        <LocationMap />

        <div className="info__footer">
          <div className="grab"></div>
          <div className="card-statistics">
            <div className="card">
              <People />
              <span>{userInfo?.steps}</span>
              <p>шаги</p>
            </div>
            <div className="line"></div>
            <div className="card">
              <TimeIcon />
              <span>{userInfo?.all_duration}</span>
              <p>время</p>
            </div>
            <div className="line"></div>
            <div className="card">
              <FireIcon className="fire-icon" />
              <span>{userInfo?.rest_energy}</span>
              <p>энергия</p>
            </div>
            <div className="line"></div>
            <div className="card">
              <FooterGeo className="geo-icon" />
              <span>{userInfo?.steps / 1200}</span>
              <p>км.</p>
            </div>
          </div>
          <button className="btn-footer" onClick={() => setStatus(!status)}>
            {status ? "Восстановить" : "Остановить"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Tracking;
