import { useEffect, useState } from 'react';

export default function TiktokPreview() {
  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch('/liked_tiktoks.json');
        const data = await res.json();
        setVideoLinks(data);
        setCurrentIndex(Math.floor(Math.random() * data.length));
      } catch (err) {
        console.error('Failed to load video links:', err);
      }
    }
    loadVideos();
  }, []);

  // Load TikTok Embed Script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 50) {
        setCurrentIndex((prev) => (prev + 1) % videoLinks.length);
      }
    };
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [videoLinks]);

  if (videoLinks.length === 0) {
    return <div className="text-center p-8">Loading TikToks...</div>;
  }

  const currentVideo = videoLinks[currentIndex];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <blockquote
        className="tiktok-embed"
        cite={currentVideo}
        data-video-id={currentVideo.split('/').pop()}
        style={{ maxWidth: 325, minWidth: 325 }}
      >
        <section></section>
      </blockquote>
    </div>
  );
}