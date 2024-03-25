// components/CameraView.js
import React from 'react';
import styled from 'styled-components';

const CameraWrapper = styled.div`
  img {
    max-width: 100%;
    height: auto;
    box-shadow: 0 0 10px ${props => props.theme.colors.accent};
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
