export const formatMinutes = (totalMinutes: number) => {
  const min = Math.floor(totalMinutes);
  const sec = Math.round((totalMinutes - min) * 60);
  return `${min}min${sec > 0 ? ` ${sec}s` : ""}`;
};
