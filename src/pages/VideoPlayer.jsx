import React, { useRef, useEffect } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play();
    }
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    const playButton = playButtonRef.current;
    if (video && playButton) {
      if (video.paused) {
        video.play();
        playButton.innerText = 'Pause Video';
      } else {
        video.pause();
        playButton.innerText = 'Play Video';
      }
    }
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <button ref={playButtonRef} id="playButton" onClick={togglePlayPause}>
        Play Video
      </button>
      <video
        ref={videoRef}
        id="myVideo"
        // playsInline
        style={{ width: '100%', maxWidth: '375px', height: '210px', marginTop: '20px' }}
      >
        <source src="https://kevinatruong.com/api/tiktok/videos/7150655984107818286.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;