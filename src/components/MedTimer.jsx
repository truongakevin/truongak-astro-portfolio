import React, { useState, useEffect } from 'react';

const TimerDisplay = () => {
  const [timeSinceLastMeds, setTimeSinceLastMeds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeSinceLastMeds = async () => {
      try {
        const response = await fetch('http://10.0.0.24/med_time');
        if (!response.ok) {
          throw new Error('Failed to fetch timer data');
        }
        const data = await response.json();
        setTimeSinceLastMeds(data.timeSinceMeds);
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

  const handleResetTimer = async () => {
    try {
      const response = await fetch('http://10.0.0.24/reset_timer', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to reset timer');
      }
      const data = await response.json();
      console.log(data.status); // Display reset success message
    } catch (err) {
      console.log('Error: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Calculate hours, minutes, and seconds from time elapsed (in milliseconds)
  const hours = Math.floor(timeSinceLastMeds / (60 * 60 * 1000));
  const minutes = Math.floor((timeSinceLastMeds % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeSinceLastMeds % (60 * 1000)) / 1000);

  const buttonStyle = {
    backgroundColor: 'var(--primary)', 
    color: 'var(--secondary)', 
    width: '60%', 
    height: '1.75em', 
    paddingLeft: '.2em', 
    marginTop: '5px', 
    marginBottom: '20px', 
    border: '5px solid var(--primary)', 
    fontSize: '.75em'
  };

  return (
    <div>
        <p style={{ margin: "20px 0px" }}>
            {hours}h {minutes}m {seconds}s
        </p>
        <button style={buttonStyle} onClick={handleResetTimer}>Reset Timer</button>
    </div>
  );
};

export default TimerDisplay;