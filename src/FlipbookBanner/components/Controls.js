import React from "react";
import PropTypes from "prop-types";

/**
 * Navigation and playback controls for the FlipbookBanner
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onPrev - Handler for previous page navigation
 * @param {Function} props.onNext - Handler for next page navigation
 * @param {Function} props.onPlay - Handler for play/pause toggle
 * @param {boolean} props.isPlaying - Current playback state
 * @param {boolean} props.isAnimating - Whether animation is in progress
 * @param {number} props.selected - Currently selected page index
 * @param {number} props.pagesLength - Total number of pages
 * @param {string} props.ariaLabel - Accessibility label for current page status
 */
const Controls = ({
  onPrev,
  onNext,
  onPlay,
  isPlaying,
  isAnimating,
  selected,
  pagesLength,
  ariaLabel,
}) => {
  const isLastPage = selected === pagesLength - 1;

  return (
    <div
      className="controls-container"
      role="toolbar"
      aria-label="Slideshow controls"
    >
      <button
        className="nav-button prev"
        onClick={onPrev}
        disabled={selected === 0 || isAnimating || isPlaying}
        aria-label="Previous page"
      >
        <img src="/assets/icons/chevron-left.svg" alt="" aria-hidden="true" />
      </button>
      <button
        className="nav-button play"
        onClick={onPlay}
        disabled={isAnimating || isLastPage}
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        <img
          src={isPlaying ? "/assets/icons/pause.svg" : "/assets/icons/play.svg"}
          alt=""
          aria-hidden="true"
        />
      </button>
      <button
        className="nav-button next"
        onClick={onNext}
        disabled={isLastPage || isAnimating || isPlaying}
        aria-label="Next page"
      >
        <img
          src="/assets/icons/chevron-left.svg"
          alt=""
          aria-hidden="true"
          className="rotate-180"
        />
      </button>
      <div className="visually-hidden" role="status" aria-live="polite">
        {ariaLabel}
      </div>
    </div>
  );
};

Controls.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired,
  pagesLength: PropTypes.number.isRequired,
};

export default React.memo(Controls);
