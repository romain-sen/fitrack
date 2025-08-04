export const formatTimeFromSecondsToHHMMSS = (timeInSeconds: number) => {
  const clampedTime = Math.max(0, timeInSeconds);
  const totalSeconds = Math.floor(clampedTime);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const formatTimeFromSecondsToMMSS = (timeInSeconds: number) => {
  const clampedTime = Math.max(0, timeInSeconds);
  const totalSeconds = Math.floor(clampedTime);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatTimeFromMsToMMSS = (timeInMs: number) => {
  const timeInSeconds = Math.floor(timeInMs / 1000);
  return formatTimeFromSecondsToMMSS(timeInSeconds);
};
