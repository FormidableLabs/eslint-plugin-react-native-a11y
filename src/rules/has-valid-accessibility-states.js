/**
 * @fileoverview Used to tell Talkback or Voiceover the state a UI Element is in
 * @author Jen Luker
 * @flow
 */

import createValidPropRule from '../factory/valid-prop';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage =
  'accessibilityStates value is not valid.\n\nSee valid values: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/docs/rules/has-valid-accessibility-states.md';

const validValues = ['selected', 'disabled', ''];

module.exports = createValidPropRule(
  'accessibilityStates',
  validValues,
  errorMessage
);
