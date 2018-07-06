/**
 * Returns boolean indicating whether a value to check
 * is one of a given set of values.
 * @flow
 */

// should be expanded to work with more than just strings
// as and when it's needed
export default function isOneOf(toCheck: string = '', values: string[] = []) {
  return values.includes(toCheck);
}
