import React, { useEffect, useRef, useState } from 'react';

export default function TiktokFeed() {
  const [videoData, setVideoData] = useState<any>(null);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [swipeDirection, setSwipeDirection] = useState<'up' | 'down' | ''>('');
  const [history, setHistory] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const isTransitioningRef = useRef(false);
  const [filterDays, setFilterDays] = useState<number | null>(null);

  // Utility function to format the date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}-${year}`;
  };

  // Fetch the next video or load a new one if at the end of history
  const loadNextVideo = async () => {
    if (currentIndex === history.length - 1) {
      try {
        let url = 'https://kevinatruong.com/api/tiktok/random';
        if (filterDays || filterDays !== 0) url += `?days=${filterDays}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();

        setHistory([...history, data]);
        setCurrentIndex(history.length);
        setShowFullCaption(false);
      } catch (err) {
        console.error('Failed to load video:', err);
      }
    } else {
      setCurrentIndex(currentIndex + 1);
      setShowFullCaption(false);
    }
  };

  // Load previous video
  const loadPreviousVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowFullCaption(false);
    }
  };

  // Handle swipe logic
  const handleSwipe = async (deltaY: number, atBottom: boolean) => {
    const video = document.getElementById("video") as HTMLElement | null;
    const animationDuration = 500;
    const waitTime = animationDuration / 3.75;

    if (!isTransitioningRef.current && video) {
      video.classList.add("transition-all", `duration-${animationDuration}`, "ease-in-out");

      if (deltaY > 50 && atBottom) {
        isTransitioningRef.current = true;
        video.classList.add("-translate-y-full");
        await new Promise((r) => setTimeout(r, waitTime));
        loadNextVideo();
        video.classList.add("transition-none");
        video.classList.remove("-translate-y-full");
        video.classList.add("translate-y-full");

        await new Promise((r) => setTimeout(r, waitTime));
        video.classList.remove("transition-none");
        video.classList.remove("translate-y-full");
        isTransitioningRef.current = false;
      } else if (deltaY < -50) {
        isTransitioningRef.current = true;
        video.classList.add("translate-y-full");
        await new Promise((r) => setTimeout(r, waitTime));
        loadPreviousVideo();
        video.classList.add("transition-none");
        video.classList.remove("translate-y-full");
        video.classList.add("-translate-y-full");

        await new Promise((r) => setTimeout(r, waitTime));
        video.classList.remove("transition-none");
        video.classList.remove("-translate-y-full");
        isTransitioningRef.current = false;
      }
    }
  };

  // Touch event listeners
  useEffect(() => {
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = async (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const deltaY = startY - endY;
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      await handleSwipe(deltaY, atBottom);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, history]);

  // Set video data when the current index changes
  useEffect(() => {
    if (currentIndex >= 0 && history[currentIndex]) {
      setVideoData(history[currentIndex]);
    }
  }, [currentIndex]);

  // Initial video load
  useEffect(() => {
    loadNextVideo();
  }, []);

  const playButtonRef = useRef<HTMLButtonElement>(null);
  const togglePlayPause = () => {
    const video = videoRef.current;
    const playButton = playButtonRef.current;
    if (video && playButton) {
      if (video.paused) {
        video.play();
        playButton.innerText = "Pause Video";
      } else {
        video.pause();
        playButton.innerText = "Play Video";
      }
    }
  };

  const maxLength = 80;
  const caption = videoData?.caption || '';

  // Dropdown component for filter selection
  const Dropdown = () => (
    <div className="absolute top-4 left-4 z-10 text-light">
      <select
        className="bg-accent py-1 px-3"
        onChange={(e) => setFilterDays(parseInt(e.target.value))}
        value={filterDays !== null ? filterDays.toString() : '0'}
      >
        <option value="0">All Time</option>
        <option value="7">Last Week</option>
        <option value="31">Last Month</option>
      </select>
    </div>
  );

  // Caption component
  const Caption = () => (
    <div
      className={`w-full flex flex-col gap-2 absolute bottom-24 lg:bottom-0 left-0 p-2 pt-12 text-white
        bg-linear-to-t/decreasing from-black${showFullCaption ? "/70" : "/50"} to-transparent to-${showFullCaption ? "85" : "75"}%`}
    >
      <p className="tracking-wide !font-semibold leading-[1.1]" id="user">
        {videoData && formatDate(videoData.date)}
      </p>
      <p className="tracking-wide !font-medium leading-[1.1]" id="user">
        {videoData && `${videoData.nickname} @${videoData.username}`}
      </p>
      <p className="tracking-wide !font-thin leading-[1.1]" id="caption">
        {caption.length > maxLength ? (
          <>
            {!showFullCaption ? (
              <>
                {caption.slice(0, maxLength)}
                <button onClick={() => setShowFullCaption(true)} className="text-left font-normal ml-2">
                  more
                </button>
              </>
            ) : (
              <>
                {caption}
                <button onClick={() => setShowFullCaption(false)} className="text-left font-normal ml-2">
                  less
                </button>
              </>
            )}
          </>
        ) : (
          caption
        )}
      </p>
    </div>
  );

  // useEffect(() => {
  //   const video = videoRef.current;
  //     if (video) {
  //       video.muted = false;
  //       video.play();
  //       alert("played")
  //     }
  // }, []);

  return (
    <div className={`w-full h-full overflow-hidden bg-dark`}>
      <Dropdown />
      <button
        ref={playButtonRef}
        id="playButton"
        className="absolute top-4 left-4 z-10 bg-accent py-1 px-3"
        onClick={togglePlayPause}
      >
        Play Video
      </button>
      <video
        ref={videoRef}
        id="video"
        className={`w-full h-[80vh] lg:h-[100vh] md:h-auto md:max-h-[90vh] transition-all duration-500`}
        src={videoData ? `https://kevinatruong.com/api/tiktok/videos/${videoData.filename}` : undefined}
        onClick={togglePlayPause}
        controls={false}
        
      />
    </div>
  );
}