import { MonoText } from "@/components/ui/MonoText";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { useChronometer } from "../../hooks/useChronometer";

interface TimeLeftForRepChronoProps {
  goalValueInSeconds: number;
}

export const TimeLeftForRepChrono = ({
  goalValueInSeconds,
}: TimeLeftForRepChronoProps) => {
  const { timeInSeconds: timeInSecondsForRepetition } = useChronometer({
    countdownInSeconds: goalValueInSeconds ?? 0,
  });
  return (
    <MonoText size="lg">
      {formatTimeFromSecondsToMMSS(timeInSecondsForRepetition)}
    </MonoText>
  );
};
