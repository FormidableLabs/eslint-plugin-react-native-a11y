/**
 * @fileoverview Used to tell Talkback or Voiceover the state a UI Element is in
 * @author Jen Luker
 * @flow
 */

import createValidPropRule from '../factory/valid-prop';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'accessibilityState must be one or more of the defined values';

const validValues = [
  'selected',
  'disabled',
];

module.exports = createValidPropRule(
  'accessibilityState',
  validValues,
  errorMessage,
);
