import { useCallback } from "react";

import pageTurn1 from "../audio/page-flip-1.mp3";
import pageTurn2 from "../audio/page-flip-2.mp3";
import pageTurn3 from "../audio/page-flip-3.mp3";

const sounds = [pageTurn1, pageTurn2, pageTurn3];

/**
 * Hook for page turn sound effect management
 * Returns memoized function that plays random sound from available options
 */
export const usePageTurnSound = () => {
  const playRandomSound = useCallback(() => {
    try {
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      const audio = new Audio(randomSound);
      audio.volume = 0.5;
      audio.play();
    } catch (error) {
      console.warn("Sound playback failed:", error);
    }
  }, []);

  return playRandomSound;
};
