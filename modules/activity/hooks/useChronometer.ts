import { useEffect, useState } from "react";

export const useChronometer = () => {
  const [running, setRunning] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(5);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 100); // TODO: change to 1000 for production
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setRunning(true);
      setCountdown(null);
    }
  }, [countdown]);

  const resetChronometerAndCountdown = () => {
    setCountdown(5);
    setRunning(false);
  };

  const pauseChronometer = () => {
    setRunning(false);
  };

  return {
    countdown,
    setCountdown,
    running,
    resetChronometerAndCountdown,
    pauseChronometer,
  };
};
