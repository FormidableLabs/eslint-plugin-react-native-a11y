/* eslint-env jest */
/**
 * @fileoverview Used to tell Talkback or Voiceover the state a UI Element is in
 * @author Jen Luker
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-states';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message:
    'accessibilityStates value is not valid.\n\nSee valid values: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/docs/rules/has-valid-accessibility-states.md',
  type: 'JSXAttribute',
};

ruleTester.run('has-valid-accessibility-states', rule, {
  valid: [
    { code: '<TouchableOpacity accessibilityStates="selected" />;' },
    { code: '<TouchableOpacity accessibilityStates="disabled" />;' },
    { code: '<TouchableOpacity accessibilityStates={["selected"]} />;' },
    { code: '<TouchableOpacity accessibilityStates={["disabled"]} />;' },
    {
      code:
        '<TouchableOpacity accessibilityStates={["selected", "disabled"]} />;',
    },
    {
      code:
        '<TouchableOpacity accessibilityStates={["disabled", "selected"]} />;',
    },
    { code: '<TouchableOpacity accessibilityStates={[""]} />;' },
    { code: '<TouchableOpacity accessibilityStates={[]} />;' },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<TouchableOpacity accessibilityStates="enabled" />',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityStates="none" />;',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityStates="primary-button" />',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
