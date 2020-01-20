/**
 * @fileoverview Enforce importantForAccessibility property value is valid
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import createValidPropRule from '../factory/valid-prop';

const errorMessage =
  'importantForAccessibility value is not valid.\n\nSee valid values: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/docs/rules/has-valid-important-for-accessibility.md';

const validValues = ['auto', 'yes', 'no', 'no-hide-descendants'];

module.exports = createValidPropRule(
  'importantForAccessibility',
  validValues,
  errorMessage
);
