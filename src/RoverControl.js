// components/RoverControl.js
import React from 'react';
import styled from 'styled-components';

const RoverControlContainer = styled.div`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 10px;
  overflow-y: auto; // If you expect many logs, make the container scrollable
  height: 200px; // Adjust height as needed
  border: 1px solid ${props => props.theme.colors.primary}; // Optional: adds a styled border
`;

const RoverControl = () => {
    // Placeholder for logs and error logs display logic
    return (
      <RoverControlContainer>
        <p>Rover Control Panel</p>
        {/* You would typically map over an array of log messages here */}
      </RoverControlContainer>
    );
  };

export default RoverControl;
