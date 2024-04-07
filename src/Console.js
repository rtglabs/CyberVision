import { useState, useEffect } from 'react';
import "./styles/Console.css"
import styled from 'styled-components';

const LogContainer = styled.div`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 10px;
  overflow-y: auto; // If you expect many logs, make the container scrollable
  height: 200px; // Adjust height as needed
  border: 1px solid ${props => props.theme.colors.primary}; // Optional: adds a styled border
`;

export default function Terminal(){
    const [log, setLog] = useState([]);


    return (
        <div className="console-container">
            <div className='console-header'>
              <ul className='window-controllers'>
                <li className='window-control'><span id="dot-exit"></span></li>
                <li className='window-control'><span id="dot-minimize"></span></li>
                <li className='window-control'><span id="dot-fullscreen"></span></li>
              </ul>
            </div>
            <form className="usr-input-form">
                <label className="usr-input-label">
                    <span>cybervision:~$ </span>
                    <input id="usr-input" type="text"/>
                </label>
            </form>
        </div>
    )
}