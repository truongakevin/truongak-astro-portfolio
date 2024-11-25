import React, { useEffect, useState } from 'react';
import CurrentlyPlaying from '../components/CurrentlyPlaying';

const SpotifyData = () => {
  const [spotifyData, setSpotifyData] = useState(null);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      const response = await fetch('https://kevinatruong.com/api/spotify/data');
      const data = await response.json();
      setSpotifyData(data);
    };

    fetchSpotifyData();
  }, []);

  if (!spotifyData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className="profile">
            <div className="profile-pic">
                <img src={spotifyData.user_profile.profile_image} alt="Profile Image" />
            </div>
            <div className="profile-info">
                <a href="https://open.spotify.com/user/kevinolis" target="_blank" rel="noopener noreferrer" > {spotifyData.user_profile.display_name} </a>
                <div className="currently-playing">
                    <h3>CURRENTLY PLAYING</h3>
                    <CurrentlyPlaying clientLoad />
                </div>
            </div>
        </div>

        <h2>TOP ARTISTS THIS MONTH</h2>
        <div className="artists-container">
            <div className="artists">
                {spotifyData.top_artists.map((artist) => (
                <div className="artist" key={artist.id}>
                    <img src={artist.image} alt={artist.name} />
                    <h4>{artist.name}</h4>
                </div>
                ))}
            </div>
        </div>

        <h2>TOP TRACKS THIS MONTH</h2>
        <div className="tracks">
            {spotifyData.top_tracks.map((track) => (
                <div className="track" key={track.id}>
                    <div className="track-pic">
                        <img src={track.album_image} alt={track.album} />
                    </div>
                    <div className="track-info">
                        <h3>{track.name}</h3>
                        <h4>{track.artists}</h4>
                    </div>
                </div>
            ))}
        </div>

        <h2>PLAYLISTS</h2>
        <div className="playlists-container">
            <div className="playlists">
                {spotifyData.user_playlists.map((playlist) => (
                <div className="playlist" key={playlist.id}>
                    <img src={playlist.image} alt={playlist.name} />
                    <h3>{playlist.name}</h3>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default SpotifyData;