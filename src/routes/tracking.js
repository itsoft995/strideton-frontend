import React, { useState, useEffect } from "react";
import Header from "../components/header";
import {
  FireIcon,
  FooterGeo,
  GPSIcon,
  People,
  TimeIcon,
} from "../assets/icons";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { getDistance } from "geolib";
const Tracking = () => {
  const [status, setStatus] = useState(false);
  // const [userLocation, setUserLocation] = useState({
  //   lat: 55.751574, // Default latitude, will update to current location
  //   lng: 37.573856, // Default longitude, will update to current location
  // });
  // const [isLocationFetched, setIsLocationFetched] = useState(false);

  // // Fetch user's current location on component mount
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setUserLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //         setIsLocationFetched(true);
  //       },
  //       (error) => {
  //         console.error("Error fetching location:", error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  
  return (
    <div className="tracking-page">
      <Header />
      <section className="iframe-section">
        <YMaps>
          <Map
            className="iframe"
            defaultState={{
              center: [location.latitude, location.longitude],
              zoom: 15,
            }}
            state={{
              center: [location.latitude, location.longitude],
              zoom: 15,
            }}
          >
            {location.latitude && (
              <Placemark
                geometry={[location.latitude, location.longitude]} // Marker at user's current location
                options={{
                  preset: "islands#blueDotIcon",
                  iconColor: "#1E90FF",
                }}
              />
            )}
          </Map>
        </YMaps>

        <button
          className="gps-btn"
          onClick={() =>
            navigator.geolocation.getCurrentPosition((position) =>
              setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
            )
          }
        >
          <GPSIcon />
        </button>

        <div className="info__footer">
          <div className="grab"></div>
          <div className="card-statistics">
            <div className="card">
              <People />
              <span>4,805</span>
              <p>шаги</p>
            </div>
            <div className="line"></div>
            <div className="card">
              <TimeIcon />
              <span>1h 14m</span>
              <p>время</p>
            </div>
            <div className="line"></div>
            <div className="card">
              <FireIcon className="fire-icon" />
              <span>360</span>
              <p>энергия</p>
            </div>
            <div className="line"></div>
            <div className="card">
              <FooterGeo className="geo-icon" />
              <span>5.46</span>
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
