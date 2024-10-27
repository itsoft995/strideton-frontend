/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react";
import { Feet } from "../assets/icons";
import api from "../utils/request";

function useAccelerometer() {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [permissionState, setPermissionState] = useState("prompt");

  useEffect(() => {
    let motionListener;

    async function requestAndStartAccelerometer() {
      try {
        if (
          "DeviceMotionEvent" in window &&
          typeof DeviceMotionEvent.requestPermission === "function"
        ) {
          const permission = await DeviceMotionEvent.requestPermission();
          setPermissionState(permission);

          if (permission === "granted") {
            motionListener = (event) => {
              const accl =
                event.acceleration || event.accelerationIncludingGravity;
              if (accl) {
                setAcceleration({
                  x: accl.x || 0,
                  y: accl.y || 0,
                  z: accl.z || 0,
                });
              }
            };
            window.addEventListener("devicemotion", motionListener);
          } else {
            alert("Необходимо разрешение для доступа к акселерометру");
          }
        } else if ("Accelerometer" in window) {
          const accelerometer = new Accelerometer({ frequency: 60 });
          accelerometer.addEventListener("reading", () => {
            setAcceleration({
              x: accelerometer.x,
              y: accelerometer.y,
              z: accelerometer.z,
            });
          });
          accelerometer.start();
        } else {
          alert("Акселерометр не поддерживается на этом устройстве");
        }
      } catch (error) {
        console.error("Ошибка инициализации акселерометра:", error);
        alert("Ошибка при доступе к акселерометру");
      }
    }

    requestAndStartAccelerometer();

    return () => {
      if (motionListener) {
        window.removeEventListener("devicemotion", motionListener);
      }
    };
  }, []);

  return { acceleration, permissionState };
}

function calculateAcceleration(x, y, z) {
  return Math.sqrt(x * x + y * y + z * z);
}

function filterAcceleration(accelBuffer, newAccel, bufferSize = 5) {
  const buffer = [...accelBuffer, newAccel].slice(-bufferSize);
  const sorted = [...buffer].sort((a, b) => a - b);
  return { filtered: sorted[Math.floor(sorted.length / 2)], buffer };
}

function detectStep(
  acceleration,
  lastStepTime,
  setStepCount,
  isAboveThreshold,
  setIsAboveThreshold,
  stepThreshold,
  stepInterval
) {
  const now = Date.now();
  if (acceleration >= stepThreshold && now - lastStepTime >= stepInterval) {
    if (!isAboveThreshold) {
      setStepCount((count) => count + 1);
      setIsAboveThreshold(true);
      return now;
    }
  } else if (acceleration < stepThreshold) {
    setIsAboveThreshold(false);
  }
  return lastStepTime;
}

function detectShake(
  acceleration,
  lastShakeTime,
  setShakeCount,
  shakeThreshold,
  shakeInterval
) {
  const now = Date.now();
  if (acceleration >= shakeThreshold && now - lastShakeTime >= shakeInterval) {
    setShakeCount((count) => count + 1);
    return now;
  }
  return lastShakeTime;
}

function DistanceCounter() {
  const { acceleration, permissionState } = useAccelerometer();
  const [stepCount, setStepCount] = useState(0);
  const [shakeCount, setShakeCount] = useState(0);
  const [lastStepTime, setLastStepTime] = useState(0);
  const [lastShakeTime, setLastShakeTime] = useState(0);
  const [isAboveThreshold, setIsAboveThreshold] = useState(false);
  const [accelBuffer, setAccelBuffer] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Geolocation state
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [geoPermission, setGeoPermission] = useState("prompt");

  const [isSaving, setIsSaving] = useState(false); // New state for saving
  const [Status, setStatus] = useState(null); // Manages category_id

  const stepThreshold = 11.5;
  const shakeThreshold = 20;
  const stepInterval = 200;
  const shakeInterval = 500;

  // Refs to hold latest state values inside interval
  const stepCountRef = useRef(stepCount);
  const latitudeRef = useRef(latitude);
  const longitudeRef = useRef(longitude);
  const StatusRef = useRef(Status);

  useEffect(() => {
    stepCountRef.current = stepCount;
  }, [stepCount]);

  useEffect(() => {
    latitudeRef.current = latitude;
  }, [latitude]);

  useEffect(() => {
    longitudeRef.current = longitude;
  }, [longitude]);

  useEffect(() => {
    StatusRef.current = Status;
  }, [Status]);

  const handleInitialize = async () => {
    if (!isInitialized && permissionState === "prompt") {
      try {
        if (typeof DeviceMotionEvent.requestPermission === "function") {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission === "granted") {
            setIsInitialized(true);
          } else {
            alert("Permission denied for accelerometer.");
          }
        } else {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error("Ошибка при запросе разрешений:", error);
        alert("Не удалось получить доступ к акселерометру");
      }
    }
  };

  useEffect(() => {
    handleInitialize();
  }, [permissionState]);

  useEffect(() => {
    let geoWatchId;

    const requestGeolocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setGeoPermission("granted");
          },
          (error) => {
            console.error("Ошибка получения геолокации:", error);
            alert("Не удалось получить доступ к геолокации");
            setGeoPermission("denied");
          }
        );

        geoWatchId = navigator.geolocation.watchPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error("Ошибка при отслеживании геолокации:", error);
          },
          { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
        );
      } else {
        alert("Geolocation не поддерживается вашим браузером");
      }
    };

    requestGeolocation();

    return () => {
      if (geoWatchId !== undefined) {
        navigator.geolocation.clearWatch(geoWatchId);
      }
    };
  }, []);

  useEffect(() => {
    const rawAccel = calculateAcceleration(
      acceleration.x,
      acceleration.y,
      acceleration.z
    );
    const { filtered, buffer } = filterAcceleration(accelBuffer, rawAccel);
    setAccelBuffer(buffer);
    setLastShakeTime(
      detectShake(
        rawAccel,
        lastShakeTime,
        setShakeCount,
        shakeThreshold,
        shakeInterval
      )
    );
    setLastStepTime(
      detectStep(
        filtered,
        lastStepTime,
        setStepCount,
        isAboveThreshold,
        setIsAboveThreshold,
        stepThreshold,
        stepInterval
      )
    );
  }, [acceleration]);

  const postSteps = async (data) => {
    try {
      const response = await api.post("/mobile/step/create-for-steps", {...data, user_id: localStorage.getItem("user_id") || 1});
      console.log("====================================");
      console.log(response.data);
      console.log("====================================");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let intervalId;

    if (isSaving) {
      setStatus(0);

      const fetchData = () => {
        const data = {
          timestamp: Date.now(),
          latitude: latitudeRef.current || null,
          longitude: longitudeRef.current || null,
        };

        let existingData = JSON.parse(localStorage.getItem("stepData")) || {
          status: 0,
          category_id: 1,
          steps: stepCount,
          data: [],
        };
        existingData.data.push(data);
        localStorage.setItem("stepData", JSON.stringify(existingData));
        postSteps(existingData);
        if (existingData.status === 0) {
          console.log("Saved data:", existingData);
          existingData.status = 1;
          localStorage.setItem("stepData", JSON.stringify(existingData));
        }
      };
      fetchData();
      intervalId = setInterval(fetchData, 30000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        if (isSaving) {
          setStatus(2);
          const stopData = {
            timestamp: Date.now(),
            latitude: latitudeRef.current || null,
            longitude: longitudeRef.current || null,
          };
          let existingData = JSON.parse(localStorage.getItem("stepData")) || {
            status: 2,
            category_id: 1,
            steps: stepCount,
            data: [],
          };
          existingData.data.push(stopData);
          localStorage.setItem("stepData", JSON.stringify(existingData));
          postSteps(existingData);
          if (existingData.status === 1) {
            existingData.status = 2;
            postSteps(existingData);
            localStorage.setItem(
              "stepData",
              JSON.stringify({
                status: 0,
                category_id: 1,
                steps: 0,
                data: [],
              })
            );
          }
        }
      }
    };
  }, [isSaving]);

  const handleSaveToggle = () => {
    if (isSaving) {
      setIsSaving(false);
    } else {
      setIsSaving(true);
    }
  };

  return (
    <div>
      <div className="custom-step">
        <Feet /> {stepCount}
      </div>
      <button className="start-button" onClick={handleSaveToggle}>
        {isSaving ? "Stop" : "Start"}
      </button>
    </div>
  );
}

export default DistanceCounter;
