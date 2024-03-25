// components/PointCloudMap.js
import React from 'react';
import styled from 'styled-components';

const PointCloudMapContainer = styled.div`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 10px;
  overflow-y: auto; // If you expect many logs, make the container scrollable
  height: 200px; // Adjust height as needed
  border: 1px solid ${props => props.theme.colors.primary}; // Optional: adds a styled border
`;
const PointCloudMap = () => {
  // Placeholder for the 3D point cloud map logic
  return(
    <PointCloudMapContainer>
        <p>3D Point Cloud Map Component</p>
    </PointCloudMapContainer>
  );
};

export default PointCloudMap;
