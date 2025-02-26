import { useState } from "react";

const MedResetButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleResetTimer = async () => {
    try {
      setIsClicked(true); // Change color when clicked
      setTimeout(() => setIsClicked(false), 300); // Reset color after 300ms

      const response = await fetch('https://kevinatruong.com/api/med/reset', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to reset timer');
      }
    } catch (err) {
      console.log('Error: ' + err.message);
    }
  };

  const buttonStyle = {
    backgroundColor: isClicked ? 'var(--accent)' : 'var(--primary)',
    color: 'var(--secondary)', 
    width: '60%', 
    height: '1.75em', 
    paddingLeft: '.2em', 
    marginTop: '5px', 
    marginBottom: '20px', 
    border: '0px solid var(--primary)', 
    fontSize: '.75em',
    transition: "background-color 0.2s ease-in-out"
  };

  return (
    <div>
        <button style={buttonStyle} onClick={handleResetTimer}>Reset Timer</button>
    </div>
  );
};

export default MedResetButton;