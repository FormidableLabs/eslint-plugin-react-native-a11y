/**
 * @fileoverview Used to tell Talkback or Voiceover the state a UI Element is in
 * @author Jen Luker
 * @flow
 */

import createValidPropRule from '../factory/valid-prop';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'accessibilityStates must be one, both, or neither of the defined values';

const validValues = ['selected', 'disabled'];

let deprecationHasBeenWarned = false;

const rule = createValidPropRule(
  'accessibilityStates',
  validValues, errorMessage,
  {
    deprecated: true
  },
  {
    Program: () => {
      if (deprecationHasBeenWarned) return
      // eslint-disable-next-line no-console
      console.log(
        'The react-native-a11y/has-valid-accessibility-state rule is deprecated. ' +
        'Please use the react-native-a11y/has-valid-accessibility-states rule instead.'
      )
      deprecationHasBeenWarned = true
    }
  }
);

module.exports = rule
