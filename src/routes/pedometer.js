import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { ArrowRight, FireIcon, FooterGeo, TimeIcon } from "../assets/icons";
// import Dropdown from "../components/dropdown";
import StepCounter from "../components/StepCounter";
import ProgressCircle from "../components/progressCircle";
import api from "../utils/request";
import StepCounterComponent from "../components/StepCounterComponent";

const Pedometer = () => {
  const [statusEnergy, setStatusEnergy] = useState(0);
  const [userInfo, setUserInfo] = useState(
    (localStorage.getItem("user_info") &&
      JSON.parse(localStorage.getItem("user_info"))) ||
      {}
  );
  const [passedSteps, setPassedSteps] = useState(userInfo.steps || 0);
  function getUserInfo() {
    api
      .get("/mobile/data/profile-info?user_id=" + userInfo?.user_id)
      .then((response) => {
        if (response.data) {
          setUserInfo(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const postSteps = async () => {
    try {
      const response = await api.post("/mobile/step/free-energy-check", {
        user_id: userInfo?.id,
      });
      if (response) {
        getUserInfo();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const todayBounce =
    new Date(userInfo?.bonus_date).getDay() !== new Date().getDay();

  useEffect(() => {
    getUserInfo();
  }, [passedSteps]);
  return (
    <div className="pedometer-page home-page">
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
      <div className="dashboard">
        {/* <DashboardIcon
          steps={passedSteps}
          goal={userInfo?.pruchased_energy || 1000}
        /> */}
        <StepCounterComponent
          goalSteps={userInfo?.pruchased_energy || 1000}
          currentSteps={passedSteps}
        />
        <div className="center-row">
          <p className="description">Шаги</p>
          <div className="numbers-row">
            <span>{passedSteps > 0 ? passedSteps : 0}</span>
          </div>
          <p className="description">/{userInfo?.purchased_energy}</p>
        </div>
        <div className="numbers-row">
          <div className="f__grid">
            <StepCounter setpassed={setPassedSteps} />
          </div>
        </div>
      </div>
      <div className="btn-row-primary">
        {todayBounce && (
          <div className="full-btn-inner" onClick={postSteps}>
            <FireIcon />
            <span>Бесплатная энергия</span>
            <div className="right-btn">
              <ArrowRight />
            </div>
          </div>
        )}

        {userInfo?.rest_energy > 0 && (
          <div
            className="full-btn-inner"
            style={{ width: userInfo?.rest_energy / 10 + "%" }}
            onClick={() => setStatusEnergy(2)}
          >
            <span
              style={{ color: userInfo?.rest_energy < 200 ? "black" : "white" }}
            >
              {userInfo?.rest_energy} / {userInfo?.purchased_energy}
            </span>
          </div>
        )}
        {!todayBounce && userInfo.rest_energy === 0 && (
          <div className="full-btn-inner" onClick={() => setStatusEnergy(0)}>
            <FireIcon />
            <span>Купить энергию</span>
            <div className="right-btn">
              <ArrowRight />
            </div>
          </div>
        )}
      </div>
      <div className="card-statistics">
        <div className="card">
          <TimeIcon />
          <span>{userInfo?.all_duration}</span>
          <p>Время</p>
        </div>
        <div className="line"></div>
        <div className="card">
          <FireIcon className="fire-icon" />
          <span>{userInfo?.rest_energy}</span>
          <p>Энергия</p>
        </div>
        <div className="line"></div>
        <div className="card">
          <FooterGeo className="geo-icon" />
          <span>{userInfo?.steps / 1200}</span>
          <p>Километры</p>
        </div>
      </div>
      <div className="progress-calendar">
        <div className="header-progress">
          <h2>Ваш прогресс</h2>
          {/* <Dropdown /> */}
        </div>
        <div className="line"></div>
        <div className="weekdays">
          {Array.from({ length: 7 }, (_, __) => (
            <div className="day" key={__}>
              <ProgressCircle date={__ + 20} progress={0} size={45} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pedometer;
