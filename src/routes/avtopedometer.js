import React, { useState, useEffect } from "react";
import Header from "../components/header";
import {
  ArrowRight,
  DashboardIcon,
  FireIcon,
  FooterGeo,
  TimeIcon,
} from "../assets/icons";
import Dropdown from "../components/dropdown";
import StepCounter from "../components/StepCounter";

const AvtoPedometer = () => {
  const [statusEnergy, setStatusEnergy] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [locationInterval, setLocationInterval] = useState(null);

  const startTracking = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: Date.now(),
        };

        // Retrieve the existing locations array from localStorage
        const locations = JSON.parse(localStorage.getItem("locations")) || [];
        locations.push(currentLocation);

        // Save the updated array back to localStorage
        localStorage.setItem("locations", JSON.stringify(locations));
        console.log("Location saved:", currentLocation);
      },
      (error) => console.error("Error fetching location:", error)
    );
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: Date.now(),
          };

          // Retrieve the existing locations array from localStorage
          const locations = JSON.parse(localStorage.getItem("locations")) || [];
          locations.push(currentLocation);

          // Save the updated array back to localStorage
          localStorage.setItem("locations", JSON.stringify(locations));
          console.log("Location saved:", currentLocation);
        },
        (error) => console.error("Error fetching location:", error)
      );
    }, 30000); // 30 seconds

    setLocationInterval(interval);
    setIsTracking(true);
  };

  const stopTracking = () => {
    if (locationInterval) {
      clearInterval(locationInterval);
      setLocationInterval(null);
    }
    setIsTracking(false);
  };

  const handleStartStop = () => {
    if (!isTracking) {
      startTracking();
    } else {
      stopTracking();
    }
  };

  // Clean up the interval on component unmount
  useEffect(() => {
    return () => {
      if (locationInterval) clearInterval(locationInterval);
    };
  }, [locationInterval]);

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
          <span>Sasha 7</span>
        </div>
      </div>
      <div className="dashboard">
        <DashboardIcon />
        <div className="center-row">
          <p className="description">KM</p>
          <div className="numbers-row">
            <span>0</span>
          </div>
          <p className="description">/10000</p>
        </div>
        <button className="start-button" onClick={handleStartStop}>
          {isTracking ? "Stop" : "Start"}
        </button>
        <div className="numbers-row">
          <span>
            <StepCounter />
          </span>
        </div>
        <p className="description">{"Всего KM за все время"}</p>
      </div>
      <div className="btn-row-primary">
        {statusEnergy === 0 ? (
          <div className="full-btn-inner" onClick={() => setStatusEnergy(1)}>
            <FireIcon />
            <span>Бесплатная энергия</span>
            <div className="right-btn">
              <ArrowRight />
            </div>
          </div>
        ) : statusEnergy === 1 ? (
          <div
            className="full-btn-inner"
            style={{ width: "60%" }}
            onClick={() => setStatusEnergy(2)}
          >
            <span>500/1000</span>
          </div>
        ) : (
          <div className="full-btn-inner" onClick={() => setStatusEnergy(0)}>
            {" "}
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
          <span>0</span>
          <p>Время</p>
        </div>
        <div className="line"></div>
        <div className="card">
          <FireIcon className="fire-icon" />
          <span>0</span>
          <p>Энергия</p>
        </div>
        <div className="line"></div>
        <div className="card">
          <FooterGeo className="geo-icon" />
          <span>0</span>
          <p>Километры</p>
        </div>
      </div>
      <div className="progress-calendar">
        <div className="header-progress">
          <h2>Ваш прогресс</h2>
          <Dropdown />
        </div>
        <div className="line"></div>
        <div className="weekdays">
          {Array.from({ length: 7 }, (_, __) => (
            <div className="day" key={__}>
              <div className="top">
                <span className="day-number">16</span>
              </div>
              <p className="day-name">Пн</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvtoPedometer;
