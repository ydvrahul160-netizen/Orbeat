// Utility helper functions

/**
 * Calculate song score based on likes, comments, and play count
 * @param {Object} song - Song object
 * @returns {number} Score value
 */
export function getScore(song) {
  return (song.likes?.length || 0) * 5 + (song.comments?.length || 0) * 3 + (song.playCount || 0)
}

/**
 * Filter items by search query
 * @param {Array} items - Items to filter
 * @param {string} query - Search query
 * @returns {Array} Filtered items
 */
export function filterByQuery(items, query) {
  const term = query.trim().toLowerCase()
  if (!term) return items
  return items.filter((item) => item.toLowerCase().includes(term))
}
