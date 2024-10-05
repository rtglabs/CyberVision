import React, { useEffect, useRef, useState } from 'react';
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
  const [isWebcamActive, setIsWebcamActive] = useState(true); // Track if the webcam is being used
  const videoRef = useRef(null);

  useEffect(() => {
    // Try to access the user's webcam
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Set the video element's source to the webcam stream
          setIsWebcamActive(true); // Webcam feed active
        }
      } catch (err) {
        console.error('Failed to access webcam: ', err);
        setIsWebcamActive(false); // Fallback to camera stream if webcam access fails
      }
    };

    startWebcam();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        // Stop webcam stream when component is unmounted
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <VideoWrapper>
      {isWebcamActive ? (
        <video ref={videoRef} autoPlay muted /> // User's webcam feed
      ) : (
        <video controls autoPlay>
          <source src={streamUrl} type="application/x-mpegURL" />
          Your browser does not support the video tag.
        </video> // Fallback to stream if webcam is not accessible
      )}
    </VideoWrapper>
  );
};

export default CameraView;