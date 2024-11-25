import React, { useEffect, useState } from 'react';

const CurrentlyPlaying = () => {
  const [spotifyData, setSpotifyData] = useState({
    currently_playing: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchInterval, setFetchInterval] = useState(1000);

  const fetchData = async () => {
    try {
      const response = await fetch('https://kevinatruong.com/api/spotify/data');
      if (!response.ok) throw new Error('Failed to fetch Spotify data');
      const data = await response.json();
      setSpotifyData(data);
      const newInterval = Math.floor(Math.random() * 5 + 1) * 1000;
      setFetchInterval(newInterval);
    } catch (err) {
      setError(err.message); // Handle error
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // fetchData();
  useEffect(() => {
    const intervalId = setInterval(fetchData, fetchInterval);
    return () => clearInterval(intervalId);
  }, [fetchInterval]);

  if (loading) {
    return <div>Loading...</div>; // Display something while loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if it occurs
  }

  const currentlyPlaying = spotifyData.currently_playing;

  // Calculate progress percentage for the progress bar
  const progressPercentage = currentlyPlaying
    ? (currentlyPlaying.track.progress_ms / currentlyPlaying.track.duration_ms) * 100
    : 0;

  return (
    <div>
        <div className="currently-playing-container">
        {currentlyPlaying ? (
          <>
            <div className="currently-playing-info">
              <div className="currently-playing-pic">
                <img src={currentlyPlaying.track.album_image} alt={currentlyPlaying.track.album}/>
              </div>
              <div className="currently-playing-song">
                <h4>{currentlyPlaying.track.name}</h4>
                <h5>{currentlyPlaying.track.artists}</h5>
              </div>
            </div>
            <div className='progress-container'>
              <div className="progress-bar-container">
                <div className="progress-bar"
                  style={{
                    transition: `width ${fetchInterval / 1000}s linear`,
                    width: `${progressPercentage}%`
                  }}
                />
              </div>
              <div className="progress-time">
                <h6>
                  {Math.floor(currentlyPlaying.track.progress_ms / 60000)}: {((currentlyPlaying.track.progress_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}{' '}
                  / {Math.floor(currentlyPlaying.track.duration_ms / 60000)}: {((currentlyPlaying.track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
                </h6>
              </div>
            </div>
          </>
        ) : (
          <p>Nothing Playing</p>
        )}
      </div>

      <style>
        {`
          @media screen and (min-width: 768px) {
            .currently-playing-container {
              min-width: 400px;
            }
          }
          .currently-playing-container {
            margin: auto 0;
            width: 100%;
            display: block;
          }
          .currently-playing-container > * {
            padding: 2px 0;
          }
          .currently-playing-pic {
            // display: flex;
            margin: auto 0 0 0;
          }
          .currently-playing-pic img {
            width: 75px;
            height: 75px;
          }
          .currently-playing-info {
            margin: auto 0;
            display: flex;
          }
          .currently-playing-song {
            margin: auto 10px auto 0;
            margin-left: 10px;
          }
          .currently-playing-song > * {
            margin: 0;
          }
          .progress-container {
            margin: 0px 0;
          }
          .progress-bar-container {
            display: block;
            width: 100%;
            height: 10px;
            background-color: #ddd;
            border-radius: 5px;
            position: relative;
            overflow: hidden;
          }
          .progress-bar {
            height: 100%;
            background-color: #111111;
          }
          .progress-time h6 {
            margin: 0;
          }
          @media screen and (max-width: 768px) {
            .currently-playing-container {
              min-width: 175px;
            }
            .currently-playing-pic img {
              width: 50px;
              height: 50px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CurrentlyPlaying;