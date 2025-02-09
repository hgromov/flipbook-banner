import React, { memo } from "react";
import PropTypes from "prop-types";

/**
 * Individual page component for the flipbook
 *
 * @component
 * @param {Object} props
 * @param {Object} props.page - Page data containing image and title
 * @param {number} props.index - Page index
 * @param {number} props.selected - Currently selected page index
 * @param {string} props.transform - CSS transform value for page animation
 * @param {number} props.zIndex - z-index value for page stacking
 * @param {boolean} props.visibility - Whether page should be visible
 * @param {Object} props.prevPage - Previous page data (if exists)
 * @param {boolean} props.current - Whether this is the current active page
 * @param {number} props.total - Total number of pages in the flipbook
 */
const Page = ({
  page,
  index,
  selected,
  transform,
  zIndex,
  visibility,
  current,
  total,
}) => (
  <div
    className={`page ${index === selected ? "selected" : ""} ${
      index < selected ? "left" : "right"
    }`}
    style={{
      transform,
      zIndex,
      opacity: visibility ? 1 : 0,
      pointerEvents: visibility ? "auto" : "none",
    }}
    role="tabpanel"
    aria-hidden={!visibility}
    aria-label={`Page ${index + 1} of ${total}`}
  >
    <div className="page-front">
      <img src={page.image} alt={page.title} />
      <h2 id={`page-title-${index}`}>{page.title}</h2>
    </div>
    <div className="page-back" aria-hidden="true" />
    <div className="page-side" aria-hidden="true" />
  </div>
);

Page.propTypes = {
  page: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  transform: PropTypes.string.isRequired,
  zIndex: PropTypes.number.isRequired,
  visibility: PropTypes.bool.isRequired,
  prevPage: PropTypes.object,
};

export default memo(Page);
