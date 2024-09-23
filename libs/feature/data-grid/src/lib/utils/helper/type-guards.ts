/**
 * Check if a value is of type number. If true, type number is asserted.
 * @param value test value that could be a number
 * @return {value is number}
 */
export const isNumeric = (value: unknown): value is number => {
  return (
    value !== undefined
    && value !== null
    && typeof value === 'number'
  );
};
