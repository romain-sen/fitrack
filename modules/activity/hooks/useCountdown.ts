import { useEffect, useState } from "react";

export const useCountdown = () => {
  const [running, setRunning] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(5);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setRunning(true);
      setCountdown(null);
    }
  }, [countdown]);

  const resetCountdown = () => {
    setCountdown(5);
    setRunning(false);
  };

  return { countdown, setCountdown, running, resetCountdown };
};
