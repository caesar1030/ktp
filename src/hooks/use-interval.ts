import { useRef, useEffect } from 'react';

function useInterval(callback: () => void, term: number) {
  const lastTimeRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const tick = (time: number) => {
      const timeDifference = time - lastTimeRef.current;
      if (timeDifference >= term) {
        callback();
        lastTimeRef.current = time;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (!frameRef.current) return;

      cancelAnimationFrame(frameRef.current);
    };
  }, [term, callback]);
}

export default useInterval;
