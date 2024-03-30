import React from 'react';
import styled from 'styled-components';

const VideoWrapper = styled.div`
  width: 100%; // Set the width as per your requirement
  height: auto; // Set the height as per your requirement
  box-shadow: 0 0 10px ${props => props.theme.colors.accent};
  video {
    width: 100%;
    height: auto;
  }
`;

const CameraView = ({ streamUrl }) => {
  return (
    <VideoWrapper>
      <video controls autoPlay>
        <source src={streamUrl} type="application/x-mpegURL" />
        Your browser does not support the video tag.
      </video>
    </VideoWrapper>
  );
};

export default CameraView;
