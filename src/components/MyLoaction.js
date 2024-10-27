import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

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
    <YMaps>
      <Map
        defaultState={{ center: position, zoom: 10 }}
        state={{ center: position, zoom: 13 }}
        width="100%"
        height="100vh"
      >
        <Placemark geometry={position} options={{ preset: 'islands#redDotIcon' }} />
      </Map>
    </YMaps>
  );
};

export default LocationMap;
