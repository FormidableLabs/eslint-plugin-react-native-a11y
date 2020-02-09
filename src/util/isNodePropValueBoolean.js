// @flow

export default function isNodePropValueBoolean(node): boolean {
  /**
   * Using `typeof getLiteralPropValue(node) === 'boolean'` with getLiteralPropValue/getPropValue
   * from `jsx-ast-utils` doesn't work as expected, because it "converts" strings `"true"` and `"false"`
   * to booleans `true` and `false`. This function aims to correctly identify uses of the string instead
   * of the boolean, so that we can correctly identify this error.
   */

  if (typeof node !== 'object' || !node.hasOwnProperty('value')) {
    // Loose check for correct data being passed in to this function
    throw new Error('isNodePropValueBoolean expects a node object as argument');
  }
  if (node.value === null) {
    // node.value is null when it is declared as a prop but not equal to anything. This defaults to `true` in JSX
    return true;
  }
  if (node.value.expression.type !== 'Literal') {
    // If not a literal, it cannot be a boolean
    return false;
  }
  return typeof node.value.expression.value === 'boolean';
}
