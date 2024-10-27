import { useEffect, useState } from 'react';

const useMotionTracker = () => {
    const [motionData, setMotionData] = useState({
        acceleration: null,
        rotation: null,
    });
    const [speed, setSpeed] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [lastAcceleration, setLastAcceleration] = useState({ x: 0, y: 0, z: 0 });
    const [lastTimestamp, setLastTimestamp] = useState(Date.now());
    const [stableCount, setStableCount] = useState(0);

    useEffect(() => {
        const handleMotion = (event) => {
            const currentAcceleration = event.accelerationIncludingGravity || event.acceleration;
            const currentTime = Date.now();

            if (currentAcceleration) {
                const deltaTime = (currentTime - lastTimestamp) / 1000; 
                setLastTimestamp(currentTime);

                const changeInAcceleration = Math.sqrt(
                    Math.pow(currentAcceleration.x - lastAcceleration.x, 2) +
                    Math.pow(currentAcceleration.y - lastAcceleration.y, 2) +
                    Math.pow(currentAcceleration.z - lastAcceleration.z, 2)
                );

                setLastAcceleration({
                    x: currentAcceleration.x,
                    y: currentAcceleration.y,
                    z: currentAcceleration.z,
                });

                if (changeInAcceleration > 0.2) {
                    const newSpeed = changeInAcceleration * deltaTime; 
                    setSpeed((prevSpeed) => Math.max(0, prevSpeed + newSpeed)); 
                    setIsMoving(true);
                    setStableCount(0);
                } else {
                    setStableCount((prev) => prev + 1);
                    if (stableCount > 5) {
                        setIsMoving(false);
                        setSpeed(0); 
                    }
                }

                setMotionData({
                    acceleration: {
                        x: currentAcceleration.x,
                        y: currentAcceleration.y,
                        z: currentAcceleration.z,
                    },
                    rotation: {
                        alpha: event.rotationRate.alpha,
                        beta: event.rotationRate.beta,
                        gamma: event.rotationRate.gamma,
                    },
                });
            }
        };

        window.addEventListener('devicemotion', handleMotion);

        return () => {
            window.removeEventListener('devicemotion', handleMotion);
        };
    }, [lastTimestamp, stableCount]);

    return { isMoving, speed: speed.toFixed(2) };
};

export default useMotionTracker;
