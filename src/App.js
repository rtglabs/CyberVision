import React, { useEffect } from 'react';
import io from 'socket.io-client';
import styled, { ThemeProvider } from 'styled-components';
import CameraView from './CameraView';
import ControlPanel from './ControlPanel';
import theme from './theme'; // Make sure you create this theme file

const socket = io('http://your-robot-car-ip:port');

const AppContainer = styled.div`
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.background};
  font-family: ${props => props.theme.fonts.primary};
  padding: 20px;
  text-align: center;
`;

const App = () => {
  const sendCommand = (command) => {
    socket.emit('command', command);
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to robot car!');
    });

    return () => socket.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <h1>CyberVision</h1>
        <CameraView streamUrl="http://88.53.197.250/axis-cgi/mjpg/video.cgi?resolution=320x240" />
        <ControlPanel onCommand={sendCommand} />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
