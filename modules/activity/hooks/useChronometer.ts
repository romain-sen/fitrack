import { useEffect, useRef, useState } from "react";

interface UseChronometerProps {
  countdownInSeconds?: number;
}

export const useChronometer = ({
  countdownInSeconds = 0,
}: UseChronometerProps) => {
  const [running, setRunning] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(countdownInSeconds);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const countdownRef = useRef<number | null>(countdownInSeconds);
  const chronometerStartRef = useRef<number | null>(null);

  const countdownTimerRef = useRef<number | null>(null);
  const chronometerIntervalRef = useRef<number | null>(null);

  const TICK_INTERVAL = 1000; // always real time now

  // Countdown
  useEffect(() => {
    if (countdownInSeconds === 0) {
      setRunning(true);
      setCountdown(null);
      return;
    }

    if (countdownRef.current !== null && countdownRef.current > 0) {
      countdownTimerRef.current = setInterval(() => {
        if (countdownRef.current !== null) {
          countdownRef.current -= 1;
          setCountdown(countdownRef.current);

          if (countdownRef.current <= 0) {
            clearInterval(countdownTimerRef.current!);
            setRunning(true);
            setCountdown(null);
          }
        }
      }, TICK_INTERVAL);
    }

    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, [countdownInSeconds]);

  // Chronometer
  useEffect(() => {
    if (running) {
      chronometerStartRef.current = Date.now();
      chronometerIntervalRef.current = setInterval(() => {
        if (chronometerStartRef.current) {
          const elapsedMs = Date.now() - chronometerStartRef.current;
          setTimeInSeconds(Math.floor(elapsedMs / 1000));
        }
      }, TICK_INTERVAL);
    } else {
      if (chronometerIntervalRef.current) {
        clearInterval(chronometerIntervalRef.current);
      }
    }

    return () => {
      if (chronometerIntervalRef.current) {
        clearInterval(chronometerIntervalRef.current);
      }
    };
  }, [running]);

  const resetTimeOnly = () => {
    chronometerStartRef.current = Date.now();
    setTimeInSeconds(0);
  };

  const pauseChronometer = () => {
    setRunning(false);
  };

  return {
    countdown,
    running,
    resetTimeOnly,
    pauseChronometer,
    timeInSeconds,
  };
};
