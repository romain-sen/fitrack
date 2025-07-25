import { MonoText } from "@/components/ui/MonoText";
import { formatTimeFromSecondsToMMSS } from "@/utils/formatTime";
import { useChronometer } from "../../hooks/useChronometer";

interface TimeLeftForStepChronoProps {
  goalValueInSeconds: number;
}

export const TimeLeftForStepChrono = ({
  goalValueInSeconds,
}: TimeLeftForStepChronoProps) => {
  const { countdown, timeInSeconds, resetChronometerAndCountdown } =
    useChronometer({
      countdownInSeconds: goalValueInSeconds ?? 0,
    });

  return (
    <MonoText size="lg" highlight={!countdown}>
      {formatTimeFromSecondsToMMSS(countdown ?? timeInSeconds)}
    </MonoText>
  );
};
