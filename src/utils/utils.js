/**
 * Capitalizes the first letter of each word in a given string.
 * 
 * @param {string} str - The string to be capitalized.
 * @return {string} - The capitalized string.
 */
export const capitalizeEachWord = (str) => {
  if (!str) return '';

  return str
    .split(' ')
    .filter(word => word.trim().length > 0)  // Filter out any empty strings from multiple spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
