import React from "react";
import { ArrowRight, LeftArrow } from "../assets/icons";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();
  return (
    <div className="support-page profile-page report-page">
      <div className="top">
        <div className="navigation">
          <LeftArrow onClick={() => navigate("/menu")} />
          <span>Поддержка</span>
        </div>
        <div className="chat">
          <div className="row">
            <div className="user">
              <img
                src={require("../assets/images/support.png")}
                alt="support"
                className="avatar"
              />
            </div>
            <div className="messages">
              <div className="message">
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="message">
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="message">
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="message">
                <p>Lorem ipsum dolor</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="messages">
              <div className="message">
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="message">
                <p>Lorem ipsum dolor</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="user">
              <img
                src={require("../assets/images/support.png")}
                alt="support"
                className="avatar"
              />
            </div>
            <div className="messages">
              <div className="message">
                <p>Lorem ipsum dolor Lorem ipsum dolor</p>
              </div>
              <div className="message">
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="message">
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="message">
                <p>Ok</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="messages">
              <div className="message">
                <p>Lorem ipsum dolor</p>
              </div>
              <div className="message">
                <p>Lorem ipsum dolorLorem ipsum dolor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <label className="sms-sender">
        <input type="text" placeholder="Отправить сообщение" />
        <div className="sender">
            <ArrowRight />
        </div>
      </label>
    </div>
  );
};

export default Support;
