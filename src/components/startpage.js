import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../redux/langSlice";
import { Check, LocationGeo } from "../assets/icons";
import { setUser } from "../redux/userSlice";

const Start = () => {
  const [step, setStep] = useState(5);
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const lang = useSelector(({ lang }) => lang);
  const changeLang = (lang) => {
    dispatch(setLang(lang));
    setStep(3);
  };
  const handleUserGenderSelect = (gender) => {
    dispatch(setUser({ ...user, gender }));
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      // setStep(1);
    }, 2000);

    const timeOutSecond = setTimeout(() => {
      // setStep(2);
    }, 4000);

    return () => {
      clearTimeout(timeOut);
      clearTimeout(timeOutSecond);
    };
  }, []);
  return step === 0 ? (
    <div className="start-page">
      <img src={require("../assets/images/start-page.png")} alt="start-page" />
      <h1>StrideTon</h1>
      <div className="bottom-loader">
        <div className="loader"></div>
      </div>
    </div>
  ) : step === 1 ? (
    <div className="loading-full">
      <div className="loading-card">
        <div className="loader" style={{ "--loader-color": "#0098EA" }}></div>
        <h3>Загрузки</h3>
      </div>
    </div>
  ) : step === 2 ? (
    <div className="loading-full">
      <div className="lang-change">
        <h4>Выберите язык</h4>
        <button
          className={lang === "ru" ? "active" : ""}
          onClick={() => changeLang("ru")}
        >
          Русский
        </button>
        <button
          className={lang === "en" ? "active" : ""}
          onClick={() => changeLang("en")}
        >
          English
        </button>
      </div>
    </div>
  ) : step === 3 ? (
    <div className="loading-full">
      <div className="loading-card permission-location-card">
        <LocationGeo />
        <h3>Запрос разрешения на доступ к местоположению</h3>
        <p>
          Чтобы отслеживать ваши маршруты и предоставлять вам подробную карту
          маршрутов, StrideTon требуется доступ к вашему местоположению.
        </p>
        <button onClick={() => setStep(4)} className="primary">
          Предоставить разрешение
        </button>
        <button onClick={() => setStep(4)} className="reject">
          Отмена
        </button>
      </div>
    </div>
  ) : step === 4 ? (
    <div className="loading-full gender-select">
      <div className="lang-change">
        <div className="top-section">
          <h1>
            Выберите свой <span>пол</span>
          </h1>
          <button
            className={user?.gender === "male" ? "active" : ""}
            onClick={() => handleUserGenderSelect("male")}
          >
            <span>Мужской</span> {user?.gender === "male" ? <Check /> : null}
          </button>
          <button
            className={user?.gender === "female" ? "active" : ""}
            onClick={() => handleUserGenderSelect("female")}
          >
            <span>Женский</span> {user?.gender === "female" ? <Check /> : null}
          </button>
        </div>
        <div className="footer-section">
          <button disabled={!user?.gender} onClick={() => setStep(5)}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Start;
