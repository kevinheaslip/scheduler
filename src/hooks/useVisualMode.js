import { useState } from 'react';

// allows Appointment components to keep track of mode they are in
export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // set new mode and add it to history array
  const transition = (mode, replace = false) => {
    setMode(mode);
    setHistory(prev => ([ ...prev, mode]));

    if (replace) {
      const previousArr = history.slice(0, history.length - 1);
      const replaceArr = [...previousArr, mode];
      
      setHistory(replaceArr);
    }
  }

  // remove last value in history array, set mode to second last value
  const back = () => {
    if (history.length > 1) {
      const previousMode = history[history.length - 2];
      const previousArr = history.slice(0, history.length - 1);
  
      setMode(previousMode);
      setHistory(previousArr);
    }
  }

  return { mode, transition, back };
}