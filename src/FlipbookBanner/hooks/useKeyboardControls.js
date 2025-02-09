import { useEffect, useCallback } from "react";

/**
 * Hook for handling keyboard navigation in FlipbookBanner
 *
 * Keyboard controls:
 * - Left Arrow: Previous page
 * - Right Arrow: Next page
 * - Space: Toggle autoplay
 *
 * @param {Object} props
 * @param {Function} props.handlePrevPage - Handler for previous page
 * @param {Function} props.handleNextPage - Handler for next page
 * @param {Function} props.toggleAutoplay - Handler for play/pause toggle
 * @param {boolean} props.isPlaying - Current autoplay state
 * @param {number} props.selected - Current page index
 * @param {number} props.pagesLength - Total number of pages
 * @param {boolean} props.isAnimating - Whether page turn animation is active
 */
export const useKeyboardControls = ({
  handlePrevPage,
  handleNextPage,
  toggleAutoplay,
  isPlaying,
  selected,
  pagesLength,
  isAnimating,
}) => {
  /**
   * Check if navigation is possible
   */
  const canNavigate = useCallback(() => {
    return !isAnimating && !isPlaying;
  }, [isAnimating, isPlaying]);

  /**
   * Check if autoplay can be toggled
   */
  const canToggleAutoplay = useCallback(() => {
    return !isAnimating && selected < pagesLength - 1;
  }, [isAnimating, selected, pagesLength]);

  /**
   * Handle keyboard events
   */
  const handleKeyPress = useCallback(
    (e) => {
      switch (e.code) {
        case "ArrowLeft":
          if (selected > 0 && canNavigate()) {
            handlePrevPage();
          }
          break;

        case "ArrowRight":
          if (selected < pagesLength - 1 && canNavigate()) {
            handleNextPage();
          }
          break;

        case "Space":
          e.preventDefault(); // Prevent page scroll
          if (canToggleAutoplay()) {
            toggleAutoplay();
          }
          break;

        default:
          break;
      }
    },
    [
      selected,
      pagesLength,
      canNavigate,
      canToggleAutoplay,
      handlePrevPage,
      handleNextPage,
      toggleAutoplay,
    ]
  );

  // Attach and cleanup keyboard event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
};
