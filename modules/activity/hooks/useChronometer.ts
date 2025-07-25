import { TIME_SPEED_FACTOR, USE_REAL_TIME } from "@/constants/timeSpeedFactor";
import { useEffect, useRef, useState } from "react";

interface UseChronometerProps {
  countdownInSeconds: number;
}

export const useChronometer = ({ countdownInSeconds }: UseChronometerProps) => {
  // If no speed factor, use real time
  const useRealTime = USE_REAL_TIME ? false : true;

  const [running, setRunning] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(countdownInSeconds);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const countdownRef = useRef<number | null>(countdownInSeconds);
  const chronometerStartRef = useRef<number | null>(null);
  const manualChronoTimeRef = useRef<number>(0);

  const countdownTimerRef = useRef<number | null>(null);
  const chronometerIntervalRef = useRef<number | null>(null);

  const TICK_INTERVAL = 1000 / TIME_SPEED_FACTOR;

  // Countdown
  useEffect(() => {
    if (countdownInSeconds === 0) {
      // Start chronometer immediately if countdown is 0
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
  }, [countdownInSeconds, useRealTime, TICK_INTERVAL]);

  // Chronometer
  useEffect(() => {
    if (running) {
      if (useRealTime) {
        chronometerStartRef.current = Date.now();
        chronometerIntervalRef.current = setInterval(() => {
          if (chronometerStartRef.current) {
            const elapsedMs = Date.now() - chronometerStartRef.current;
            setTimeInSeconds(Math.floor(elapsedMs / 1000));
          }
        }, TICK_INTERVAL);
      } else {
        chronometerIntervalRef.current = setInterval(() => {
          manualChronoTimeRef.current += 1;
          setTimeInSeconds(manualChronoTimeRef.current);
        }, TICK_INTERVAL);
      }
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
  }, [running, useRealTime, TICK_INTERVAL]);

  const resetChronometerAndCountdown = () => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    if (chronometerIntervalRef.current)
      clearInterval(chronometerIntervalRef.current);

    countdownRef.current = countdownInSeconds;
    chronometerStartRef.current = null;
    manualChronoTimeRef.current = 0;

    setCountdown(countdownInSeconds);
    setTimeInSeconds(0);
    setRunning(false);
  };

  const pauseChronometer = () => {
    setRunning(false);
  };

  return {
    countdown,
    running,
    resetChronometerAndCountdown,
    pauseChronometer,
    timeInSeconds,
  };
};
