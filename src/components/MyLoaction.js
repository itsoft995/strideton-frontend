import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { GPSIcon } from "../assets/icons";

const LocationMap = () => {
  const [position, setPosition] = useState([55.751244, 37.618423]); // Default coordinates (Moscow)

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <div style={{
        position: "absolute",
        top: -50,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        height: "90vh",
        overflow: "hidden",
      }}>
        <YMaps>
          <Map
            defaultState={{ center: position, zoom: 14 }}
            state={{ center: position, zoom: 14 }}
            width="100%"
            height="100vh"
          >
            <Placemark
              geometry={position}
              options={{ preset: "islands#redDotIcon" }}
            />
          </Map>
        </YMaps>
      </div>
      <button
        className="gps-btn"
        onClick={() =>
          navigator.geolocation.getCurrentPosition((position) =>
            setPosition([position.coords.latitude, position.coords.longitude])
          )
        }
      >
        <GPSIcon />
      </button>
    </>
  );
};

export default LocationMap;
