import React from "react";
import Header from "../components/header";
import {
  ChartIconFlag,
  Feet,
  FireIcon,
  FooterGeo,
  TimeIcon,
} from "../assets/icons";
import Dropdown from "../components/dropdown";
import Calendar from "../components/calendar";
import StepCounter from "../components/StepCounter";

const Report = () => {
  return (
    <div className="report-page">
      <Header />
      <div className="dashboard-box">
        <div className="top-row">
          <Feet />
          <span><StepCounter /></span>
        </div>
        <p className="description">Всего шагов за все время</p>
        <div className="line"></div>
        <div className="card-statistics">
          <div className="card">
            <TimeIcon />
            <span>85h 24m</span>
            <p>Время</p>
          </div>
          <div className="line"></div>
          <div className="card">
            <FireIcon className="fire-icon" />
            <span>20,492</span>
            <p>Энергия</p>
          </div>
          <div className="line"></div>
          <div className="card">
            <FooterGeo className="geo-icon" />
            <span>294.35</span>
            <p>Километры</p>
          </div>
        </div>
      </div>
      <div className="chart-box">
        <div className="top-chart">
          <h3>Статистика</h3>
          <Dropdown />
        </div>
        <div className="line"></div>

        <section className="chart-custome">
          <div className="step-chart">
            <aside className="number-side">
              <span>7k</span>
              <span>6k</span>
              <span>5k</span>
              <span>4k</span>
              <span>3k</span>
              <span>2k</span>
              <span>1k</span>
            </aside>
            <div className="chart-lines">
              <div className="column" style={{ "--height": "75%" }}>
                <div className="info">
                  <div className="inner-info">
                    <ChartIconFlag />
                    <span>5,289</span>
                    <p>шагов</p>
                  </div>
                </div>
              </div>
              <div className="column" style={{ "--height": "80%" }}>
                <div className="info">
                  <div className="inner-info">
                    <ChartIconFlag />
                    <span>5,289</span>
                    <p>шагов</p>
                  </div>
                </div>
              </div>
              <div className="column" style={{ "--height": "65%" }}>
                <div className="info">
                  <div className="inner-info">
                    <ChartIconFlag />
                    <span>5,289</span>
                    <p>шагов</p>
                  </div>
                </div>
              </div>
              <div className="column" style={{ "--height": "74%" }}>
                <div className="info">
                  <div className="inner-info">
                    <ChartIconFlag />
                    <span>5,289</span>
                    <p>шагов</p>
                  </div>
                </div>
              </div>
              <div className="column" style={{ "--height": "75%" }}>
                <div className="info">
                  <div className="inner-info">
                    <ChartIconFlag />
                    <span>5,289</span>
                    <p>шагов</p>
                  </div>
                </div>
              </div>
              <div className="column" style={{ "--height": "100%" }}>
                <div className="info">
                  <div className="inner-info">
                    <ChartIconFlag />
                    <span>5,289</span>
                    <p>шагов</p>
                  </div>
                </div>
              </div>
              <div className="column" style={{ "--height": "90%" }}>
                <div className="info">
                  <div className="inner-info">
                    <ChartIconFlag />
                    <span>5,289</span>
                    <p>шагов</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-dates">
            <div className="date-inner">16</div>
            <div className="date-inner">17</div>
            <div className="date-inner">18</div>
            <div className="date-inner">19</div>
            <div className="date-inner">20</div>
            <div className="date-inner">21</div>
            <div className="date-inner">22</div>
          </div>
        </section>
      </div>
      <div className="chart-box">
        <div className="top-chart">
          <h3>Ваш прогресс</h3>
          <Dropdown
            defaulValue={{
              label: "В этом месяце",
              value: 2,
            }}
          />
        </div>
        <div className="line"></div>

        <section className="chart-custome">
          <Calendar />
        </section>
      </div>
    </div>
  );
};

export default Report;
