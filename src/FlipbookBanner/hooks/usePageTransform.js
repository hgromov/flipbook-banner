import { useCallback } from "react";

/**
 * Hook for calculating page transformations during animations
 *
 * Handles:
 * - Page rotation calculations
 * - Visibility management
 * - Z-index stacking order
 *
 * @returns {Object} Page transformation utility functions
 */
export const usePageTransform = () => {
  /**
   * Calculate rotation transform for a page
   *
   * @param {number} index - Page index
   * @param {boolean} isPlaying - Autoplay state
   * @param {number} autoplayProgress - Current autoplay position
   * @param {number} selected - Selected page index
   * @returns {string} CSS transform value
   */
  const getPageTransform = useCallback(
    (index, isPlaying, autoplayProgress, selected) => {
      if (isPlaying) {
        const currentPage = Math.floor(autoplayProgress);

        if (index < currentPage) return "rotateY(-360deg)";
        if (index > Math.ceil(autoplayProgress)) return "rotateY(0deg)";
        if (index === currentPage) {
          const progress = autoplayProgress - currentPage;
          return `rotateY(${-360 * progress}deg)`;
        }
      }

      return index < selected ? "rotateY(-360deg)" : "rotateY(0deg)";
    },
    []
  );

  /**
   * Determine if a page should be visible
   * Only show current and next page for performance
   *
   * @param {number} index - Page index
   * @param {boolean} isPlaying - Autoplay state
   * @param {number} autoplayProgress - Current autoplay position
   * @param {number} selected - Selected page index
   * @returns {boolean} Whether page should be visible
   */
  const getPageVisibility = useCallback(
    (index, isPlaying, autoplayProgress, selected) => {
      if (isPlaying) {
        const currentPage = Math.floor(autoplayProgress);
        return index === currentPage || index === currentPage + 1;
      }

      return index === selected || index === selected + 1;
    },
    []
  );

  /**
   * Calculate z-index for proper page stacking
   *
   * @param {number} index - Page index
   * @param {boolean} isPlaying - Autoplay state
   * @param {number} autoplayProgress - Current autoplay position
   * @param {Array} pages - Array of all pages
   * @param {number} selected - Selected page index
   * @returns {number} Z-index value
   */
  const getZIndex = useCallback(
    (index, isPlaying, autoplayProgress, pages, selected) => {
      if (isPlaying) {
        const currentPage = Math.floor(autoplayProgress);

        if (index === currentPage) return pages.length;
        if (index === currentPage + 1) return pages.length - 1;
        return 0;
      }

      return pages.length - index;
    },
    []
  );

  return { getPageTransform, getPageVisibility, getZIndex };
};
