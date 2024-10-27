import React, { useEffect, useState } from "react";

const ProgressCircle = ({ size = 42, progress = 75, date = null }) => {
  const radius = size / 2 - 4; // Circle radius (subtracting stroke width)
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const [strokeDashoffset, setStrokeDashoffset] = useState(100); // Calculate the stroke-dashoffset

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setStrokeDashoffset(circumference - (circumference * progress) / 100);
    }, 0);

    return () => {
      clearInterval(timeOutId);
    };
  }, [progress, circumference]);

  return (
    <div
      className="progress-circle"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg className="circle" width={size} height={size}>
        <circle
          className="circle-background"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="4"
        />
        <circle
          className="circle-foreground"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="progress-text" style={{ fontSize: `${size / 3.5}px` }}>
        {date || progress}
      </div>
    </div>
  );
};

export default ProgressCircle;
