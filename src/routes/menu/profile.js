import React, { useState } from "react";
import { ArrowDown, Check, LeftArrow, PenIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const handleUserGenderSelect = (gender) => {
    dispatch(setUser({ ...user, gender }));
  };
  return (
    <div className="profile-page report-page">
      <header>
        <div
          onClick={() => {
            if (
              (window.history?.length && window.history.length > 1) ||
              window.history.state?.idx
            ) {
              navigate(-1);
            } else {
              navigate("/", { replace: true });
            }
          }}
          className="navigation"
        >
          <LeftArrow />
          <span>Личная информация</span>
        </div>
        <label className="image-picker">
          <input type="file" accept="image/*" />
          <div className="image-box">
            <img
              src={"https://picsum.photos/200"}
              alt="https://picsum.photos/200"
            />
            <PenIcon />
          </div>
        </label>
      </header>
      <label className="label">
        <span>Username</span>
        <div className="input-box">
          <input type="text" placeholder="@loremipsum" />
        </div>
      </label>
      <label className="label">
        <span>Номер телефона</span>
        <div className="input-box">
          <div className="row">
            <img
              src={require("../../assets/images/usa-flag.png")}
              alt="usa-flag"
            />
            <ArrowDown />
          </div>
          <input type="text" placeholder="+0 000 000 00 00" />
        </div>
      </label>
      <label className="label" onClick={() => setOpen(true)}>
        <span>Ваш пол</span>
        <div className="input-box">
          <input
            type="text"
            placeholder="Ваш пол"
            value={user?.gender || ""}
            readOnly
          />
          <ArrowDown />
        </div>
      </label>
      {open && (
        <div className="loading-full gender-select">
          <div className="lang-change">
            <div className="top-section">
              <h1>
                Выберите свой <span>пол</span>
              </h1>
              <button
                className={user?.gender === "Мужской" ? "active" : ""}
                onClick={() => handleUserGenderSelect("Мужской")}
              >
                <span>Мужской</span>{" "}
                {user?.gender === "Мужской" ? <Check /> : null}
              </button>
              <button
                className={user?.gender === "Женский" ? "active" : ""}
                onClick={() => handleUserGenderSelect("Женский")}
              >
                <span>Женский</span>{" "}
                {user?.gender === "Женский" ? <Check /> : null}
              </button>
            </div>
            <div className="footer-section">
              <button disabled={!user?.gender} onClick={() => setOpen(false)}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
