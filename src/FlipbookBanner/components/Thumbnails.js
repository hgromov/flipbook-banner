import React from "react";
import PropTypes from "prop-types";

/**
 * Page indicator dots for navigation
 *
 * @component
 * @param {Object} props
 * @param {Array} props.pages - Array of page data
 * @param {number} props.selected - Currently selected page index
 * @param {Function} props.onSelect - Handler for page selection
 * @param {boolean} props.isAnimating - Whether animation is in progress
 * @param {boolean} props.isPlaying - Whether autoplay is active
 */
const Thumbnails = ({ pages, selected, onSelect, isAnimating, isPlaying }) => (
  <div className="thumbnails-container">
    {pages.map((_, index) => (
      <button
        key={index}
        className={`thumbnail ${selected === index ? "active" : ""}`}
        onClick={() => !isAnimating && !isPlaying && onSelect(index)}
        disabled={isAnimating || isPlaying}
        aria-label={`Go to page ${index + 1}`}
      >
        <span className="thumbnail-dot" />
      </button>
    ))}
  </div>
);

Thumbnails.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  isAnimating: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default React.memo(Thumbnails);
