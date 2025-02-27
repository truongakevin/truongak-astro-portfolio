import { useState, useEffect } from "react";

const MedResetButton = ({ medName, minWaitTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [canTakeMed, setCanTakeMed] = useState(false);

  useEffect(() => {
    const fetchTimeSinceLastMeds = async () => {
      try {
        const response = await fetch(`https://kevinatruong.com/api/med/check/${medName}`);
        if (!response.ok) {
          throw new Error("Failed to fetch timer data");
        }
        const data = await response.json();
        setElapsedTime(data.elapsed_time);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };

    fetchTimeSinceLastMeds();

    // Poll every 1 seconds
    const interval = setInterval(fetchTimeSinceLastMeds, 1000);
    return () => clearInterval(interval);
  });

  // Update `canTakeMed` whenever `elapsedTime` changes
  useEffect(() => {
    setCanTakeMed(elapsedTime >= minWaitTime);
  }, [elapsedTime, minWaitTime]);

  const handleResetTimer = async () => {
    try {
      const response = await fetch(`https://kevinatruong.com/api/med/reset/${medName}`, { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to reset timer");
      }
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  // Calculate progress percentage
  const progress = Math.min(1, elapsedTime / minWaitTime); // Clamp between 0 and 1

  const buttonStyle = {
    width: "60%",
    height: "1.75em",
    fontSize: ".75em",
    marginTop: "5px",
    marginBottom: "20px",
    border: "0px solid var(--primary)",
    color: "var(--secondary)",
    background: `linear-gradient(to right, var(--primary) ${progress * 100}%, var(--accent) ${progress * 100}%)`,
    cursor: canTakeMed ? "pointer" : "not-allowed",
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handleResetTimer} disabled={!canTakeMed}>Reset Timer</button>
    </div>
  );
};

export default MedResetButton;