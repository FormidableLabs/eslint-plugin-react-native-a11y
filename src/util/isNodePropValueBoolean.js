// @flow
import type { JSXAttribute } from 'ast-types-flow';

export default function isattrPropValueBoolean(attr: JSXAttribute): boolean {
  /**
   * Using `typeof getLiteralPropValue(attr) === 'boolean'` with getLiteralPropValue/getPropValue
   * from `jsx-ast-utils` doesn't work as expected, because it "converts" strings `"true"` and `"false"`
   * to booleans `true` and `false`. This function aims to correctly identify uses of the string instead
   * of the boolean, so that we can correctly identify this error.
   */

  if (typeof attr !== 'object' || !attr.hasOwnProperty('value')) {
    // Loose check for correct data being passed in to this function
    throw new Error('isattrPropValueBoolean expects a attr object as argument');
  }

  const { value } = attr;

  if (value === null) {
    // attr.value is null when it is declared as a prop but not equal to anything. This defaults to `true` in JSX
    return true;
  }

  if (!value || !value.expression) {
    return false;
  }

  const { expression } = value;

  if (expression.type === 'Identifier') {
    // we can't determine the associated value type of an Identifier expression
    // treat these cases as though they are valid
    return true;
  }

  if (expression.type !== 'Literal') {
    // If not a literal, it cannot be a boolean
    return false;
  }
  // $FlowFixMe
  return typeof expression.value === 'boolean';
}
