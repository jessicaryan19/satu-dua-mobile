import { useEffect, useMemo, useState } from 'react';

const formatCountdown = (totalSeconds: number) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export function useCountdown(initialSeconds: number) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const resetCountdown = () => setSecondsLeft(initialSeconds);

    const formattedTime = useMemo(() => formatCountdown(secondsLeft), [secondsLeft]);
    const isActive = useMemo(() => secondsLeft > 0, [secondsLeft]);

    useEffect(() => {
        if (secondsLeft === 0) return;
        const interval = setInterval(() => {
            setSecondsLeft((s) => s - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [secondsLeft]);

    return { secondsLeft, formattedTime, isActive, resetCountdown };
}
