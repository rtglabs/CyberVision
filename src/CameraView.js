import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for the pixel rover moving
const moveRover = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(20px); }
  100% { transform: translateX(0); }
`;

// Styled components for the animation and wrapper
const VideoWrapper = styled.div`
  width: 100%; 
  height: 300px; 
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${props => props.theme.colors.accent};
  box-shadow: 0 0 10px ${props => props.theme.colors.accent};
`;

const RoverAnimation = styled.div`
  width: 80px;
  height: 80px;
  background-image: url('/path/to/pixel-rover.png'); // Replace with your rover image path
  background-size: contain;
  background-repeat: no-repeat;
  animation: ${moveRover} 2s infinite linear;
`;

const TelemetryData = styled.div`
  color: limegreen;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
`;

const CameraView = () => {
  const [speed, setSpeed] = useState(0);
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    // Simulate telemetry updates
    const updateTelemetry = setInterval(() => {
      setSpeed(Math.floor(Math.random() * 10) + 1); // Random speed between 1 and 10
      setTemperature(Math.floor(Math.random() * 40) + 10); // Random temperature between 10 and 50
    }, 2000);

    return () => clearInterval(updateTelemetry);
  }, []);

  return (
    <VideoWrapper>
      <div>
        <RoverAnimation />
        <TelemetryData>
          <p>Speed: {speed} km/h</p>
          <p>Temperature: {temperature}°C</p>
          <p>Mission Status: Nominal</p>
        </TelemetryData>
      </div>
    </VideoWrapper>
  );
};

export default CameraView;