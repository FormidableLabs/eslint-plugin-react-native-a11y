/**
 * @fileoverview Enforce `accessibilityLiveRegion` property value is valid

 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import createValidPropRule from '../factory/valid-prop';

const errorMessage =
  'accessibilityLiveRegion value is not valid.\n\nSee valid values: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/docs/rules/has-valid-accessibility-live-region.md';

const validValues = ['none', 'polite', 'assertive'];

module.exports = createValidPropRule(
  'accessibilityLiveRegion',
  validValues,
  errorMessage
);
