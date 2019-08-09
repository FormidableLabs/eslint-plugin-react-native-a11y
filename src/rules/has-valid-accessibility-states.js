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
  'accessibilityStates must be one, both or neither of the defined values';

const validValues = ['selected', 'disabled', ''];

module.exports = createValidPropRule(
  'accessibilityStates',
  validValues,
  errorMessage
);
