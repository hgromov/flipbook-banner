import React, { memo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { usePageTurnSound } from "../hooks/usePageTurnSound";

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
 * @param {number} props.total - Total number of pages in the flipbook
 */
const Page = ({
  page,
  index,
  selected,
  transform,
  zIndex,
  visibility,
  total,
}) => {
  const previousSelectedRef = useRef(selected);
  const playPageTurnSound = usePageTurnSound();

  useEffect(() => {
    if (selected !== previousSelectedRef.current && visibility) {
      playPageTurnSound();
      previousSelectedRef.current = selected;
    }
  }, [selected, visibility, playPageTurnSound]);

  return (
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
    </div>
  );
};

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
  current: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
};

export default memo(Page);
