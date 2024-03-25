// components/Logs.js
import React from 'react';
import styled from 'styled-components';

const LogContainer = styled.div`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 10px;
  overflow-y: auto; // If you expect many logs, make the container scrollable
  height: 200px; // Adjust height as needed
  border: 1px solid ${props => props.theme.colors.primary}; // Optional: adds a styled border
`;

const Logs = () => {
  // Placeholder for logs and error logs display logic
  return (
    <LogContainer>
      <p>Logs and Error Logs of the Rover will be displayed here.</p>
      {/* You would typically map over an array of log messages here */}
    </LogContainer>
  );
};

export default Logs;
