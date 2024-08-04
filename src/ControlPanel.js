// ControlPanel.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { RobotWebSocket } from './RobotWebSocket';

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  border: none;
  color: ${props => props.theme.colors.text};
  padding: 10px 20px;
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.primary};
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;

const ControlPanel = () => {
  const sendCommand = useContext(RobotWebSocket);

  const handleCommand = (command) => {
    console.log(`Button clicked: ${command}`);
    sendCommand(command);
  };

  return (
    <div>
      <Button onClick={() => handleCommand('w')}>Forward</Button>
      <Button onClick={() => handleCommand('s')}>Backward</Button>
      <Button onClick={() => handleCommand('a')}>Left</Button>
      <Button onClick={() => handleCommand('d')}>Right</Button>
    </div>
  );
};

export default ControlPanel;
