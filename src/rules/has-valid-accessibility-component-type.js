/**
 * @fileoverview Enforce accessibilityComponentType property value is valid
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import createValidPropRule from '../factory/valid-prop';

const errorMessage =
  'accessibilityComponentType value is not valid.\n\nSee valid values: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/docs/rules/has-valid-accessibility-component-type.md';

const validValues = [
  'none',
  'button',
  'radiobutton_checked',
  'radiobutton_unchecked',
];

module.exports = createValidPropRule(
  'accessibilityComponentType',
  validValues,
  errorMessage
);
