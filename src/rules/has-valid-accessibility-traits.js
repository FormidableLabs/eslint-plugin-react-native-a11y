/**
 * @fileoverview Enforce accessibilityTraits property value is valid
 * @author Alex Saunders
 * @flow
 */

import createValidPropRule from '../factory/valid-prop';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage =
  'accessibilityTraits value is not valid.\n\nSee valid values: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/docs/rules/has-valid-accessibility-traits.md';

const validValues = [
  'none',
  'button',
  'link',
  'header',
  'search',
  'image',
  'selected',
  'plays',
  'key',
  'text',
  'summary',
  'disabled',
  'frequentUpdates',
  'startsMedia',
  'adjustable',
  'allowsDirectInteraction',
  'pageTurn',
];

module.exports = createValidPropRule(
  'accessibilityTraits',
  validValues,
  errorMessage
);
