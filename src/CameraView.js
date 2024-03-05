import React from 'react';
import styled from 'styled-components';

const CameraWrapper = styled.div`
  img {
    /* Set the maximum width to 80% or 90% of its container */
    width: 60%; // Adjust this value as needed to slightly reduce the size
    height: auto; // Maintain the aspect ratio
    box-shadow: 0 0 10px ${props => props.theme.colors.accent};
    /* Center the image if it's smaller than the container */
    display: block;
    margin: 0 auto;
  }
`;

const CameraView = ({ streamUrl }) => {
  return (
    <CameraWrapper>
      <img src={streamUrl} alt="Robot Camera View" />
    </CameraWrapper>
  );
};

export default CameraView;
