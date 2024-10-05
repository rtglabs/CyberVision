// ControlPanel.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { RobotWebSocket } from './RobotWebSocket';

// Flex container to center the ButtonGrid
const ButtonGridContainer = styled.div`
  display: flex;
  justify-content: center; /* Horizontally center the button grid */
  align-items: center; /* Vertically center (optional, depending on your layout) */
  height: 100%; /* Ensure it takes full height of the parent container */
`;

// Button container styled as a grid
const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 80px 80px 80px; /* Fixed size for columns */
  grid-template-rows: 80px 80px 80px; /* Fixed size for rows */
  grid-gap: 30px; /* Spacing between buttons */
  justify-items: center;
  align-items: center;
  padding: 0; /* No extra padding around the grid */
`;

// Updated button to remove unnecessary margins/padding
const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  border: none;
  color: ${props => props.theme.colors.text};
  padding: 6px 12px; /* Keep padding smaller */
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.primary};
  margin: 0; /* Removed margin */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;

// Swivel button with a circular shape
const SwivelButton = styled(Button)`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  font-size: 10px;
`;

// Octagonal stop button
const StopButton = styled(Button)`
  background-color: #FF3131;
  width: 70px;
  height: 70px;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 0;
  margin-top: -45px;
`;

// Style adjustment to the Backward button
const BackwardButton = styled(Button)`
  grid-column: 2; /* Keeps it centered */
  margin-top: -90px; /* Adjust this value to raise or lower the button */
`;

// Style adjustment to the Backward button
const LRButton = styled(Button)`
 background-color: ${props => props.theme.colors.primary};
  border: none;
  color: ${props => props.theme.colors.text};
  padding: 6px 12px; /* Keep padding smaller */
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.primary};
  margin: 0; /* Removed margin */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
  margin-top: -45px; /* Adjust this value to raise or lower the button */
`;

const ControlPanel = () => {
  const sendCommand = useContext(RobotWebSocket);

  const handleCommand = (command) => {
    console.log(`Button clicked: ${command}`);
    sendCommand(command);
  };

  return (
    <ButtonGridContainer>
      <ButtonGrid>
        <SwivelButton onClick={() => handleCommand('q')}>Swivel Left</SwivelButton>
        <Button onClick={() => handleCommand('w')}>Forward</Button>
        <SwivelButton onClick={() => handleCommand('e')}>Swivel Right</SwivelButton>
        <LRButton onClick={() => handleCommand('a')}>Left</LRButton>
        <StopButton onClick={() => handleCommand('stop')}>STOP</StopButton>
        <LRButton onClick={() => handleCommand('d')}>Right</LRButton>
        <BackwardButton onClick={() => handleCommand('s')}>Backward</BackwardButton>
      </ButtonGrid>
    </ButtonGridContainer>
  );
};

export default ControlPanel;