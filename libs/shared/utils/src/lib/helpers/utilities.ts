/**
 * Use in default block of a switch statement to ensure that all cases have been used.
 * @param value switch expression to check for exhaustion
 */
export const assertCannotReach = (value: never): never => {
  throw new Error(`Not exhausted all switch cases from ${value}`);
}
