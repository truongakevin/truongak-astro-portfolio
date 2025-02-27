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
  const progressPercentage = currentlyPlaying ? (currentlyPlaying.track.progress_ms / currentlyPlaying.track.duration_ms) * 100 : 0;

  return (
    <div>
        <div className="currently-playing-container">
        {currentlyPlaying?.is_playing ? (
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
    </div>
  );
};

export default CurrentlyPlaying;