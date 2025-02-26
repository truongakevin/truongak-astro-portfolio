import React, { useState, useEffect } from 'react';

const MedTimerDisplay = () => {
  const [timeSinceLastMeds, setTimeSinceLastMeds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeSinceLastMeds = async () => {
      try {
        const response = await fetch('https://kevinatruong.com/api/med/check');
        if (!response.ok) {
          throw new Error('Failed to fetch timer data');
        }
        const data = await response.json();
        setTimeSinceLastMeds(data.elapsed_time);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSinceLastMeds();

    // Poll every 10 seconds
    const interval = setInterval(fetchTimeSinceLastMeds, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Calculate hours, minutes, and seconds from time elapsed (in milliseconds)
  const days = Math.floor(timeSinceLastMeds / (24 * 3600)); // 1 day = 86400 seconds
  const hours = Math.floor((timeSinceLastMeds % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeSinceLastMeds % 3600) / 60);
  const seconds = timeSinceLastMeds % 60;

  return (
    <div>
        <p style={{ margin: "0px 0px" }}>
            {days}d {hours}h {minutes}m {seconds}s
        </p>
    </div>
  );
};

export default MedTimerDisplay;