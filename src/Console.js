import { useState, useEffect } from 'react';
import "./styles/Console.css"
//import styled from 'styled-components';

// const LogContainer = styled.div`
//   background: ${props => props.theme.colors.background};
//   color: ${props => props.theme.colors.text};
//   padding: 10px;
//   overflow-y: auto; // If you expect many logs, make the container scrollable
//   height: 200px; // Adjust height as needed
//   border: 1px solid ${props => props.theme.colors.primary}; // Optional: adds a styled border
// `;

export default function Terminal(){
    const [logs, setLog] = useState([]);

    useEffect(() => {
      const interval = setInterval(() => {
        const cursorElem = document.getElementById("cursor");
        cursorElem.className = cursorElem.className === "blink" ? "blink-stop" : "blink";
      }, 650);
      return () => {
        clearInterval(interval);
      };
    }, []);

    const handleKeyDown = (event) => {
      const usrInput = document.getElementById('usr-input');
      if(event.key === "Enter"){
        event.preventDefault();
        setLog(prevLog => [...prevLog, usrInput.innerHTML]);
        usrInput.innerHTML = '';
      }
    };


    return (
        <div className="console-container">
            <div className='console-header'>
              <ul className='window-controllers'>
                <li className='window-control'><span id="dot-exit"></span></li>
                <li className='window-control'><span id="dot-minimize"></span></li>
                <li className='window-control'><span id="dot-fullscreen"></span></li>
              </ul>
            </div>

            <div className='console-logs'>
              {logs.map(log => (
                <div key={log.id}>{log}</div>
              ))}
            </div>

            <div className="usr-input-label">
              <span>cybervision:~$ </span>
              <span id="usr-input" contenteditable="true" onKeyDown={handleKeyDown}></span>
              <span id='cursor'></span>
            </div>
        </div>
    )
}