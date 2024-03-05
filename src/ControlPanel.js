import React from 'react';
import styled from 'styled-components';

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

const ControlPanel = ({ onCommand }) => {
  return (
    <div>
      <Button onClick={() => onCommand('forward')}>Forward</Button>
      <Button onClick={() => onCommand('backward')}>Backward</Button>
      <Button onClick={() => onCommand('left')}>Left</Button>
      <Button onClick={() => onCommand('right')}>Right</Button>
    </div>
  );
};

export default ControlPanel;
