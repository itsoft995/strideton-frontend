import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const StepCounterComponent = (props) => {
  const [currentSteps, setCurrentSteps] = useState(props.currentSteps);
  const [goalSteps, setGoalSteps] = useState(props.goalSteps);
  const progressCircleRef = useRef(null);
  const animationFrameRef = useRef(null);

  const createTicks = () => {
    const ticks = [];
    const numTicks = 20;
    const outerRadius = 72;
    const innerRadius = 75;
    const innerRadiusLong = 70;

    for (let i = 0; i <= numTicks; i++) {
      const angle = -210 + (i * 240) / numTicks;

      if (angle > 180) continue;

      const isLongTick = i % 4 === 0;
      const tickInnerRadius = isLongTick ? innerRadiusLong : innerRadius;

      const angleRad = (angle * Math.PI) / 180;
      const x1 = 100 + tickInnerRadius * Math.cos(angleRad);
      const y1 = 100 + tickInnerRadius * Math.sin(angleRad);
      const x2 = 100 + outerRadius * Math.cos(angleRad);
      const y2 = 100 + outerRadius * Math.sin(angleRad);

      ticks.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#ddd"
          strokeWidth={isLongTick ? "1.5" : "1"}
        />
      );
    }
    return ticks;
  };

  const animateNumber = (start, end) => {
    const duration = 500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = Math.floor(start + (end - start) * progress);
      setCurrentSteps(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const updateProgress = (steps) => {
    const radius = 87;
    const circumference = 2 * Math.PI * radius;
    const maxAngle = 240;
    const progress = steps / goalSteps;

    const arcLength = (maxAngle / 360) * circumference;
    const progressLength = progress * arcLength;
    const dashOffset = arcLength - progressLength;

    if (progressCircleRef.current) {
      progressCircleRef.current.style.transition =
        "stroke-dashoffset 0.5s ease";
      progressCircleRef.current.style.strokeDasharray = `${arcLength} ${circumference}`;
      progressCircleRef.current.style.strokeDashoffset = dashOffset;
      progressCircleRef.current.style.transform = "rotate(-242deg)";
      progressCircleRef.current.style.transformOrigin = "center";
    }

    animateNumber(currentSteps, steps);
  };

  useEffect(() => {
    updateProgress(currentSteps);
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleUpdateClick = () => {
    updateProgress(Math.floor(Math.random() * 10000));
  };

  return (
    <div className="container__step">
      <div className="progress-ring" style={{ position: "relative" }}>
        <svg width="200" height="200">
          <circle
            className="progress-ring__circle"
            stroke="#f0f0f0"
            strokeWidth="21"
            fill="transparent"
            r="90"
            cx="100"
            cy="100"
            strokeLinecap="round"
            style={{
              transform: "rotate(-120deg)",
              transformOrigin: "center",
            }}
            strokeDasharray={`${(200 / 405) * (2 * Math.PI * 90)} ${
              (40 / 220) * (2 * Math.PI * 90)
            }`}
            strokeDashoffset="0"
          />

          <g id="ticks">{createTicks()}</g>

          <circle
            ref={progressCircleRef}
            className="progress-ring__circle"
            stroke="#0098ea"
            strokeWidth="23"
            fill="transparent"
            r="87"
            cx="100"
            cy="100"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default StepCounterComponent;
