import React, { useState, useEffect } from 'react';

const RobotWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const connect = () => {
    const ws = new WebSocket('ws://localhost:8765'); // Replace with the actual server URL
    setSocket(ws);

    ws.onopen = () => console.log('WebSocket connected!');

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      // Handle incoming robot messages here
    };

    ws.onerror = (error) => console.error('WebSocket error:', error);

    ws.onclose = () => console.log('WebSocket closed');
  };

  const sendMessage = (message) => {
    if (socket) {
      socket.send(message);
      // Handle outgoing messages to the robot here
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    // Render UI for messages and controls, e.g.,
    <div>
      {/* ... message display ... */}
      <button onClick={() => sendMessage('move-forward')}>Move Forward</button>
      {/* ... other controls ... */}
    </div>
  );
};

export default RobotWebSocket;
