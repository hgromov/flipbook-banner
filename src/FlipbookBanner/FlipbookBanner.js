import React, { useRef, useEffect } from "react";
import { useFlipAnimation } from "./hooks/useFlipAnimation";
import { usePageTransform } from "./hooks/usePageTransform";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import Page from "./components/Page";
import Controls from "./components/Controls";
import Thumbnails from "./components/Thumbnails";
import "./FlipbookBanner.css";

/**
 * FlipbookBanner Component
 *
 * A responsive banner component with animated page-turning effects
 *
 * @component
 * @param {Object[]} pages - Array of page data objects
 * @param {string} pages[].image - Image URL for the page
 * @param {string} pages[].title - Title text for the page
 *
 * @example
 * const pages = [
 *   { image: "/assets/page1.jpg", title: "Page 1" },
 *   { image: "/assets/page2.jpg", title: "Page 2" }
 * ];
 *
 * return <FlipbookBanner pages={pages} />;
 */
const FlipbookBanner = ({
  pages,
  animationDuration = 800,
  animationEasing = "cubic-bezier(0.3, 0.06, 0.2, 1)",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.setProperty(
        "--flip-duration",
        `${animationDuration / 1000}s`
      );
      container.style.setProperty("--flip-easing", animationEasing);
    }
  }, [animationDuration, animationEasing]);

  // Custom hooks for managing state and animations
  const {
    selected,
    isPlaying,
    autoplayProgress,
    handlePrevPage,
    handleNextPage,
    toggleAutoplay,
    isAnimating,
    handlePageSelect,
  } = useFlipAnimation(pages);

  // Hook for page transformation calculations
  const { getPageTransform, getPageVisibility, getZIndex } = usePageTransform();

  // Add keyboard navigation support
  useKeyboardControls({
    handlePrevPage,
    handleNextPage,
    toggleAutoplay,
    isPlaying,
    selected,
    pagesLength: pages.length,
    isAnimating,
  });

  return (
    <div
      className="flipbook-container"
      role="region"
      aria-label="Image slideshow"
      ref={containerRef}
    >
      <div className="book">
        <div className="pages-container" aria-live="polite" aria-atomic="true">
          {pages.map((page, index) => (
            <Page
              key={index}
              page={page}
              index={index}
              selected={selected}
              transform={getPageTransform(
                index,
                isPlaying,
                autoplayProgress,
                selected
              )}
              zIndex={getZIndex(
                index,
                isPlaying,
                autoplayProgress,
                pages,
                selected
              )}
              visibility={getPageVisibility(
                index,
                isPlaying,
                autoplayProgress,
                selected
              )}
              prevPage={pages[index - 1]}
              current={index === selected}
              total={pages.length}
            />
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <Controls
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        onPlay={toggleAutoplay}
        isPlaying={isPlaying}
        isAnimating={isAnimating}
        selected={selected}
        pagesLength={pages.length}
        ariaLabel={`Page ${selected + 1} of ${pages.length}`}
      />

      {/* Page indicators */}
      <Thumbnails
        pages={pages}
        selected={selected}
        onSelect={handlePageSelect}
        isAnimating={isAnimating}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default FlipbookBanner;
