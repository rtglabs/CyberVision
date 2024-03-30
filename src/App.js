// App.js
import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import CameraView from './CameraView';
import PointCloudMap from './PointCloudMap';
import GPSUnit from './GPSUnit';
import SignalStrength from './SignalStrength';
import WeaponsControl from './WeaponsControl';
import RoverControl from './RoverControl';
import Logs from './Logs';
import theme from './theme';
import RobotWebSocket from './webClient';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  padding: 20px;
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.background};
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
  const streamUrl = "http://172.16.213.140:8080/hls/stream.m3u8";
  
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header>
          <div>CyberVision</div>
          <SignalStrength />
        </Header>
        <MainContent>
          <CameraView streamUrl={streamUrl} />
          <PointCloudMap />
          <GPSUnit />
          <RobotWebSocket />
        </MainContent>
        <Footer>
          <WeaponsControl />
          <RoverControl />
          <Logs />
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
