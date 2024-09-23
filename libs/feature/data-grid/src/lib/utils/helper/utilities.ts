/**
 * Escape special character within a string to use in a RegExp
 * @param {string} str
 */
export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
