import React, { useEffect, useState } from 'react';

type CurrentlyPlayingTrack = {
  is_playing: boolean;
  track: {
    name: string;
    artists: string;
    album: string;
    album_image: string;
    progress_ms: number;
    duration_ms: number;
  };
};

type SpotifyData = {
  currently_playing: CurrentlyPlayingTrack | null;
};

const CurrentlyPlaying: React.FC = () => {
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({ currently_playing: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchInterval, setFetchInterval] = useState<number>(1000);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('https://kevinatruong.com/api/spotify/data');
      if (!response.ok) throw new Error('Failed to fetch Spotify data');
      const data: SpotifyData = await response.json();
      setSpotifyData(data);
      // setSpotifyData({"user_profile":{"id":"kevinolis","display_name":"kevdawg","profile_image":"https://i.scdn.co/image/ab6775700000ee856e6899691d32bf03a10b9a83","followers":25},"top_artists":[{"id":"20wkVLutqVOYrc0kxFs7rA","name":"Daniel Caesar","image":"https://i.scdn.co/image/ab6761610000e5ebe5bc630548fb3517cf90edb8","genres":[],"popularity":86},{"id":"73sIBHcqh3Z3NyqHKZ7FOL","name":"Childish Gambino","image":"https://i.scdn.co/image/ab6761610000e5ebc3dc5429b676b16d451e5f77","genres":[],"popularity":82},{"id":"5nvWOyAkfNgVLKESq4fOj2","name":"Montell Fish","image":"https://i.scdn.co/image/ab6761610000e5ebe89c210ab9c802e40edab268","genres":[],"popularity":76},{"id":"6KImCVD70vtIoJWnq6nGn3","name":"Harry Styles","image":"https://i.scdn.co/image/ab6761610000e5ebf7db7c8ede90a019c54590bb","genres":[],"popularity":84},{"id":"72iCiKwu6nu6Qq9emIwzYv","name":"Kayzo","image":"https://i.scdn.co/image/ab6761610000e5ebff7c81f22e249903c1fceba2","genres":["dubstep","deathstep","riddim","edm"],"popularity":55},{"id":"02vrwnrNEeDRV96o9iPSYP","name":"sign crushes motorist","image":"https://i.scdn.co/image/ab67616d0000b2739ff5156f825ae0e06e15ff46","genres":["slowcore"],"popularity":67},{"id":"04GCjO1r1hPelibCUq9S8H","name":"Fog Lake","image":"https://i.scdn.co/image/ab6761610000e5eb351342194cb97193ed1d4386","genres":["slowcore"],"popularity":53},{"id":"1HxXNvsraqrsgfmju1yKk8","name":"Modern Baseball","image":"https://i.scdn.co/image/ab6761610000e5eb61fb7bc248f90cd8e7b0223d","genres":["midwest emo","emo","pop punk","folk punk","math rock"],"popularity":65},{"id":"246dkjvS1zLTtiykXe5h60","name":"Post Malone","image":"https://i.scdn.co/image/ab6761610000e5ebe17c0aa1714a03d62b5ce4e0","genres":[],"popularity":89},{"id":"2h93pZq0e7k5yf4dywlkpM","name":"Frank Ocean","image":"https://i.scdn.co/image/ab6761610000e5ebee3123e593174208f9754fab","genres":[],"popularity":88}],"top_tracks":[{"id":"7CK4bpTIiYWYp478jgSlgp","name":"5","artists":"Dean Blunt, Elias Rønnenfelt","album":"lucre","album_image":"https://i.scdn.co/image/ab67616d0000b273a1906f03b1e2a0f2eaa3d6b5","duration_ms":120500},{"id":"6BiCjPFN5rM9JPy5eP5mCs","name":"RIP Young","artists":"Isaiah Rashad","album":"The House Is Burning","album_image":"https://i.scdn.co/image/ab67616d0000b273ac895ae149e004dcbb6367be","duration_ms":158050},{"id":"6jbYpRPTEFl1HFKHk1IC0m","name":"Like Him (feat. Lola Young)","artists":"Tyler, The Creator, Lola Young","album":"CHROMAKOPIA","album_image":"https://i.scdn.co/image/ab67616d0000b273124e9249fada4ff3c3a0739c","duration_ms":278014},{"id":"2cVIKCgIfYOYyyXfQEstZN","name":"hue_man nature","artists":"Saba, No ID","album":"hue_man nature","album_image":"https://i.scdn.co/image/ab67616d0000b273c73c0f9f63328a4c782dbb02","duration_ms":100666},{"id":"6j8gTlbhj9KJSeypNcNAS9","name":"Street Lights","artists":"Kanye West","album":"808s & Heartbreak","album_image":"https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18","duration_ms":189906},{"id":"5S8jc9sCle880PjbwnEzsY","name":"Aoi, Koi, Daidaiiro No Hi","artists":"MASS OF THE FERMENTING DREGS","album":"World Is Yours","album_image":"https://i.scdn.co/image/ab67616d0000b2735f2ca3e8b93fd5bc304480f5","duration_ms":282173},{"id":"3dwfmnwrUPDu8ouSDmX8O2","name":"Flying Cars","artists":"antronsongs","album":"Flying Cars","album_image":"https://i.scdn.co/image/ab67616d0000b273c59f1321a55a41671dbdc798","duration_ms":181732},{"id":"0SZenVPubqt5p0Q1z7rAr7","name":"renai circulation pluggnb (恋愛サーキュレーション)","artists":"cadenkala","album":"renai circulation pluggnb (恋愛サーキュレーション)","album_image":"https://i.scdn.co/image/ab67616d0000b27358690d7079c6be1a5d7d453d","duration_ms":132739},{"id":"1B10XgaxSXRLAFq967oMpF","name":"Hero","artists":"Family of the Year","album":"Loma Vista","album_image":"https://i.scdn.co/image/ab67616d0000b273263e906ce0d9cfed22c5f8b6","duration_ms":190280},{"id":"28487fkXVQa2e6F2z73CBO","name":"Dynasties & Dystopia (from the series Arcane League of Legends)","artists":"Denzel Curry, Gizzle, Bren Joy, Arcane, League of Legends","album":"Dynasties & Dystopia (from the series Arcane League of Legends)","album_image":"https://i.scdn.co/image/ab67616d0000b273066d6510ec1d62cd1f55153a","duration_ms":178080}],"user_playlists":[{"id":"4TkGndiWx0M6dNtoWAOYKp","name":"because i wanted to","description":"i miss you and i still do care about you and it’s sucks to know that you are hurting because of me. ","image":"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84cf6a890c1bab14c96b422f4e","tracks_count":18},{"id":"3gb9uCij915idomQB7aero","name":"not for climbing","description":"Keep your eyes open please listen to me","image":"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84eafd3d57588b70de7e4a0e45","tracks_count":42},{"id":"4C67oyZkJYSqMkUnQIl0TZ","name":"tell you straight","description":"","image":"https://mosaic.scdn.co/640/ab67616d00001e0259d7f5007fcf226aa1b7022dab67616d00001e029041b9965925059507fb44afab67616d00001e02a40f3e4d1deb1ec3ec78019eab67616d00001e02cd4563537bf6c2fcf28a9182","tracks_count":4},{"id":"4eu6ayyfV0bPLeCBt4C1tj","name":"burg","description":"","image":"https://mosaic.scdn.co/640/ab67616d00001e0247c6d3ef1c0ea358e59e4f4dab67616d00001e02565fcb4f8ba78d4c5d23ef08ab67616d00001e026f7b8758c82974e6d08a72beab67616d00001e02f46e995aa84c6eb1080100a4","tracks_count":8},{"id":"53itW1kNrZDTmQ252Rx5dr","name":"no standing while vehicle is in motion","description":"","image":"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84398c33778602bd3e79059c1a","tracks_count":39}],"currently_playing":{"is_playing":true,"track":{"id":"45ROR8UMn60YEVQnDy0uVF","name":"Juliet","artists":"Cavetown","album":"Animal Kingdom","album_image":"https://i.scdn.co/image/ab67616d0000b27317add53ee7ef16ac10e6f8a9","progress_ms":135610,"duration_ms":278991}}});
      const newInterval = Math.floor(Math.random() * 5 + 1) * 1000;
      setFetchInterval(newInterval);
  } catch (err: any) {
      setError(err.message ?? 'Unknown error');
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const currentlyPlaying = spotifyData?.currently_playing;

  // Calculate progress percentage for the progress bar
  const progressPercentage = currentlyPlaying ? (currentlyPlaying.track.progress_ms / currentlyPlaying.track.duration_ms) * 100 : 0;

  return (
    <div>
      {currentlyPlaying?.is_playing ? (
        <div className='flex flex-col gap-1'>
          <div className="flex flex-row gap-1">
            <div className="flex-shrink-0">
              <img className=" object-cover w-[clamp(3.75rem,5vw,20rem)] h-[clamp(3.75rem,5vw,20rem)];" src={currentlyPlaying.track.album_image} alt={currentlyPlaying.track.album}/>
            </div>
            <div className="my-auto">
              <h4 className=''>{currentlyPlaying.track.name}</h4>
              <h5 className='text-accent'>{currentlyPlaying.track.artists}</h5>
            </div>
          </div>
          <div className="block lg:w-2/3 h-[7px] mr-2 bg-accent rounded relative overflow-hidden">
            <div className="h-full bg-dark"
              style={{
                transition: `width ${fetchInterval / 1000}s linear`,
                width: `${progressPercentage}%`
              }}
            />
          </div>
          <h6 className="m-0">
            {Math.floor(currentlyPlaying.track.progress_ms / 60000)}: {((currentlyPlaying.track.progress_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}{' '}
            / {Math.floor(currentlyPlaying.track.duration_ms / 60000)}: {((currentlyPlaying.track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
          </h6>
        </div>
      ) : (
        <p>Nothing Playing</p>
      )}
    </div>
  );
};

export default CurrentlyPlaying;