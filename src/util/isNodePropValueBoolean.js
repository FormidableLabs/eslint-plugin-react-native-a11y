// @flow
import type { JSXAttribute } from 'ast-types-flow';
import isNodePropExpression from './isNodePropExpression';

export default function isattrPropValueBoolean(attr: JSXAttribute): boolean {
  /**
   * Using `typeof getLiteralPropValue(attr) === 'boolean'` with getLiteralPropValue/getPropValue
   * from `jsx-ast-utils` doesn't work as expected, because it "converts" strings `"true"` and `"false"`
   * to booleans `true` and `false`. This function aims to correctly identify uses of the string instead
   * of the boolean, so that we can correctly identify this error.
   */

  const isExpression = isNodePropExpression(attr);
  if (isExpression || attr.value === null) {
    // we can't determine the resulting value type of JSXExpressions
    // attr.value is null when it is declared as a prop but not equal to anything. This defaults to `true` in JSX
    // treat these cases as though they are valid
    return true;
  } else {
    // $FlowFixMe
    const { expression } = attr.value;
    if (expression?.type !== 'Literal') {
      // If not a literal, it cannot be a boolean
      return false;
    }
    // $FlowFixMe
    return typeof expression?.value === 'boolean';
  }
}
