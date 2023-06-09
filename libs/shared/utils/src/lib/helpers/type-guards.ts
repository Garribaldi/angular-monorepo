/**
 * Check if a provided value exists inside an enum
 *
 * @param value a value that is supposed to be a valid enum member
 * @param e enum to test value against
 */
export const isInEnum = <T extends { [s: string | number]: unknown }>(value: unknown, e: T): value is T[keyof T] => {
  return Object.values(e).includes(value as T[keyof T]);
}

/**
 * Check if a value is defined, so it is ensured that this value is of a certain type.
 *
 * @param value test value that could be undefined
 */
export const isDefined = <T>(value: T): value is NonNullable<T> => value !== undefined && value !== null;

export const isString = (value: unknown): value is string => {
  return (
    value !== undefined
    && value !== null
    && typeof value === "string"
  );
}

export const isNumber = (value: unknown): value is number => {
  return (
    value !== undefined
    && value !== null
    && typeof value === "number"
  );
}

/**
 * Check if a value is of type Date. If true, type Date is asserted
 * @param value test value that could be a date
 */
export const isDate = (value: unknown): value is Date => {
  return (
    value !== undefined
    && value !== null
    && value instanceof Date
  );
}
