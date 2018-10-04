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
import rule from '../../../src/rules/has-valid-accessibility-state';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'accessibilityState must be one or both of the defined values',
  type: 'JSXAttribute',
};

ruleTester.run('has-valid-accessibility-role', rule, {
  valid: [
    { code: '<TouchableOpacity accessibilityRole="selected" />;' },
    { code: '<TouchableOpacity accessibilityRole="disabled" />;' },
    { code: '<TouchableOpacity accessibilityRole={["selected"]} />;' },
    { code: '<TouchableOpacity accessibilityRole={["disabled"]} />;' },
    { code: '<TouchableOpacity accessibilityRole={["selected", "disabled"]} />;' },
    { code: '<TouchableOpacity accessibilityRole={["disabled", "selected"]} />;' },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<TouchableOpacity accessibilityRole="enabled" />',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityRole="none" />;',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityRole={[]} />;',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityRole="primary-button" />',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
