// utils/readingTime.js

/**
 * Estimate reading time based on word count.
 * Average reading speed = 200 words per minute
 */
exports.calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
};
