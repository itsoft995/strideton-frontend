/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react";
import { Feet } from "../assets/icons";
import api from "../utils/request";
import useWebSocket from "react-use-websocket";
import useMotionTracker from "../utils/useMotionTracker";
import { getDeviceType } from "../utils/getDevice";
let previousStepCount = 0;

function updateStepCount(stepCount, shakeCount) {
  if (stepCount === previousStepCount) {
    return stepCount;
  } else {
    stepCount -= shakeCount;
    shakeCount = 0;
    previousStepCount = stepCount;
    return stepCount;
  }
}

function useAccelerometer() {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [permissionState, setPermissionState] = useState("prompt");

  useEffect(() => {
    async function requestAndStartAccelerometer() {
      try {
        if (
          "DeviceMotionEvent" in window &&
          typeof DeviceMotionEvent.requestPermission === "function"
        ) {
          const permission = await DeviceMotionEvent.requestPermission();
          setPermissionState(permission);

          if (permission === "granted") {
            window.addEventListener("devicemotion", (event) => {
              const accl =
                event.acceleration || event.accelerationIncludingGravity;
              if (accl) {
                setAcceleration({
                  x: accl.x || 0,
                  y: accl.y || 0,
                  z: accl.z || 0,
                });
              }
            });
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
      if ("DeviceMotionEvent" in window) {
        window.removeEventListener("devicemotion", () => {});
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
  stepInterval,

  speed,
  isMoving,
  deviceType
) {
  const now = Date.now();
  if (acceleration >= stepThreshold && now - lastStepTime >= stepInterval) {
    if (!isAboveThreshold) {
      setStepCount((count) => count + 1);
      if (deviceType === "iOS") {
        if (isMoving) {
          if (speed > 20) {
            setStepCount((count) => count + 1);
          }
        }
      } else {
        if (isMoving) {
          if (speed > 20) {
            setStepCount((count) => count + 1);
          }
        }
      }
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

function StepCounter({ setpassed }) {
  const deviceType = getDeviceType();

  const { isMoving, speed } = useMotionTracker();
  const [userInfo, setuserInfo] = useState(
    (localStorage.getItem("user_info") &&
      JSON.parse(localStorage.getItem("user_info"))) ||
      {}
  );
  const { acceleration, permissionState } = useAccelerometer();
  const [stepCount, setStepCount] = useState(0);
  const [shakeCount, setShakeCount] = useState(0);
  const [lastStepTime, setLastStepTime] = useState(0);
  const [lastShakeTime, setLastShakeTime] = useState(0);
  const [isAboveThreshold, setIsAboveThreshold] = useState(false);
  const [accelBuffer, setAccelBuffer] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(0);

  const stepThreshold = deviceType === "iOS" ? 1 : 12.5;
  const shakeThreshold = 20;
  const stepInterval = 200;
  const shakeInterval = 500;

  const handleInitialize = async () => {
    if (!isInitialized && permissionState === "prompt") {
      try {
        if (typeof DeviceMotionEvent.requestPermission === "function") {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission === "granted") {
            setIsInitialized(true);
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
    if (isSaving) {
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
          stepInterval,
          speed,
          isMoving,
          deviceType
        )
      );
    }
  }, [acceleration]);
  const postSteps = async (data) => {
    try {
      const response = await api.post("/mobile/step/step-update", {
        ...data,
        user_id: Number(userInfo?.user_id || 1),
      });

      if (response.data) {
        setuserInfo(response.data.data);
        setStepCount(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  let updatedStepCount = updateStepCount(
    stepCount,
    shakeCount,
    setShakeCount,
    speed,
    isMoving
  );
  useEffect(() => {
    if (deviceType === "iOS") {
      setpassed(stepCount);
    } else {
      setpassed(updatedStepCount);
    }
  }, [stepCount, updatedStepCount]);
  const fetchData = () => {
    const sendingStep = deviceType === "iOS" ? stepCount : updatedStepCount;
    let existingData = JSON.parse(localStorage.getItem("stepData")) || {
      status: 0,
      category_id: 1,
      steps: sendingStep,
    };
    localStorage.setItem("stepData", JSON.stringify(existingData));
    postSteps(existingData);
    if (existingData.status === 0) {
      console.log("Saved data:", existingData);
      existingData.status = 1;
      localStorage.setItem("stepData", JSON.stringify(existingData));
    }
  };
  useEffect(() => {
    fetchData();
  }, [isSaving]);

  const handleSaveToggle = () => {
    handleInitialize();
    sendStepUpdate();
    if (isSaving) {
      setIsSaving(false);
    } else {
      setIsSaving(true);
    }
  };

  const socketUrl = "ws://91.92.137.52:9988";
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log("Connected to WebSocket"),
    onClose: () => console.log("Disconnected from WebSocket"),
    onError: (event) => console.error("WebSocket error:", event),
    shouldReconnect: (closeEvent) => true,
  });

  // Function to send the "actionStepUpdate" message
  const sendStepUpdate = () => {
    const sendingStep = deviceType === "iOS" ? stepCount : updatedStepCount;
    const message = JSON.stringify({
      action: "actionStepUpdate",
      body: {
        user_id: Number(userInfo?.user_id) || 1,
        category_id: 1,
        steps: sendingStep,
      },
    });
    sendMessage(message);
  };

  // Process incoming messages
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      const stepWeb = data.data.data;
      console.log("Step update response:", data);
      setuserInfo(stepWeb);
      if (data.action === "actionStepUpdate") {
        console.log("Step update response:", data);
      }
    }
  }, [lastMessage]);
  return (
    <div>
      <div className="custom-step">
        <Feet /> <span> {userInfo.steps}</span>
      </div>
      <article
        style={{
          textAlign: "center",
          fontSize: 16,
          margin: 0,
          padding: 0,
        }}
      >
        {"Всего шагов за все время"}
      </article>
      <button className="start-button" onClick={handleSaveToggle}>
        {isSaving ? "Stop" : "Start"}
      </button>
    </div>
  );
}

export default StepCounter;
