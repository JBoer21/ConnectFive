import React, { useState, useEffect } from 'react';
import "./timer.css"

function CountdownTimer() {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="countdown-timer">
      <p>Next Solution: {countdown}</p>
    </div>
  );
}

export default CountdownTimer;