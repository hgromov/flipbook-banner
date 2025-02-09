import { useState, useRef, useEffect, useCallback } from "react";
import { ANIMATION_DURATION, AUTOPLAY_DURATION } from "../constants";

/**
 * Custom hook for managing flipbook animation and state
 *
 * Handles:
 * - Page turning animations
 * - Autoplay functionality
 * - Page selection
 * - Animation states
 *
 * @param {Array} pages - Array of page objects
 * @returns {Object} Animation state and control functions
 */
export const useFlipAnimation = (pages) => {
  // State management
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplayProgress, setAutoplayProgress] = useState(0);

  // Animation frame reference
  const animationFrameRef = useRef(null);

  /**
   * Handles autoplay animation using requestAnimationFrame
   */
  useEffect(() => {
    if (!isPlaying) return;

    let startTime;
    let currentPage = selected;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / AUTOPLAY_DURATION;

      // Update progress only if not on last page
      if (currentPage < pages.length - 1) {
        setAutoplayProgress(currentPage + progress);
      }

      if (progress >= 1) {
        if (currentPage >= pages.length - 1) {
          setIsPlaying(false);
          setAutoplayProgress(pages.length - 1);
          return;
        }
        startTime = timestamp;
        currentPage += 1;
        setSelected(currentPage);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, selected, pages.length]);

  /**
   * Handles animation state cleanup and page transition
   */
  const handlePageTransition = useCallback((newPage) => {
    setIsAnimating(true);
    setSelected(newPage);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  }, []);

  /**
   * Navigate to previous page
   */
  const handlePrevPage = useCallback(() => {
    if (selected > 0 && !isAnimating) {
      handlePageTransition(selected - 1);
    }
  }, [selected, isAnimating, handlePageTransition]);

  /**
   * Navigate to next page
   */
  const handleNextPage = useCallback(() => {
    if (selected < pages.length - 1 && !isAnimating) {
      handlePageTransition(selected + 1);
    }
  }, [selected, pages.length, isAnimating, handlePageTransition]);

  /**
   * Handle direct page selection
   */
  const handlePageSelect = useCallback(
    (index) => {
      if (!isAnimating && !isPlaying && index !== selected) {
        handlePageTransition(index);
      }
    },
    [isAnimating, isPlaying, selected, handlePageTransition]
  );

  /**
   * Toggle autoplay state
   */
  const toggleAutoplay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    selected,
    isPlaying,
    autoplayProgress,
    isAnimating,
    handlePrevPage,
    handleNextPage,
    toggleAutoplay,
    handlePageSelect,
  };
};
