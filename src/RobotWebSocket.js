// RobotWebSocket.js
import React, { useEffect, useState, useCallback } from 'react';

const RobotWebSocket = React.createContext();

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://18.118.229.52:8765');
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendCommand = useCallback((command) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log(`Sending command: ${command}`);
      socket.send(command);
    } else {
      console.error('WebSocket is not open. Unable to send command.');
    }
  }, [socket]);

  return (
    <RobotWebSocket.Provider value={sendCommand}>
      {children}
    </RobotWebSocket.Provider>
  );
};

export { WebSocketProvider, RobotWebSocket };