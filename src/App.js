// App.js
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import CameraView from './CameraView';
import PointCloudMap from './PointCloudMap';
import GPSUnit from './GPSUnit';
import SignalStrength from './SignalStrength';
import WeaponsControl from './WeaponsControl';
import RoverControl from './RoverControl';
import Console from './Console';
import ControlPanel from './ControlPanel';
import theme from './theme';
import { WebSocketProvider } from './RobotWebSocket';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  padding: 20px;
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
`;

const Header = styled.header`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainContent = styled.main`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const Footer = styled.footer`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 16px;
`;

const App = () => {
  const streamUrl = "http://10.6.0.1/hls/stream.m3u8";

  console.log("Rendering App");

  return (
    <ThemeProvider theme={theme}>
      <WebSocketProvider>
        <AppContainer>
          <Header>
            <div>CyberVision</div>
            <SignalStrength />
          </Header>
          <MainContent>
            <CameraView streamUrl={streamUrl} />
            <PointCloudMap />
            <GPSUnit />
            <WeaponsControl />
            <ControlPanel />
            <Console />
          </MainContent>
          <Footer />
        </AppContainer>
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default App;
