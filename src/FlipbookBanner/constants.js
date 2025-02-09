/**
 * Animation timing constants for FlipbookBanner
 */

/**
 * Duration of a single page turn animation
 * Controls how long it takes to flip one page
 * Affects manual navigation and thumbnail jumps
 * @constant {number}
 */
export const ANIMATION_DURATION = 800; // milliseconds

/**
 * Duration between automatic page turns during autoplay
 * Controls how long each page is shown before turning to next
 * Only affects autoplay mode
 * @constant {number}
 */
export const AUTOPLAY_DURATION = 2000; // milliseconds
