import { useCallback, useEffect, useRef } from 'react';

type TCallback = (time?: number) => void;

export const useInterval = (callback: TCallback, timeout: number): void => {
  const savedCallback = useRef(callback);

  const handler = useCallback(
    () => savedCallback.current(new Date().getTime()),
    [],
  );

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (timeout) {
      const id = window.setInterval(handler, timeout);
      return (): void => window.clearInterval(id);
    }
  }, [handler, timeout]);
};
