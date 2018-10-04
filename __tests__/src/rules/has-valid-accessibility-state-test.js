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
	type: 'JSXAttribute'
};

ruleTester.run('has-valid-accessibility-state', rule, {
	valid: [
		{ code: '<TouchableOpacity accessibilityState="selected" />;' },
		{ code: '<TouchableOpacity accessibilityState="disabled" />;' },
		{ code: '<TouchableOpacity accessibilityState={["selected"]} />;' },
		{ code: '<TouchableOpacity accessibilityState={["disabled"]} />;' },
		{ code: '<TouchableOpacity accessibilityState={["selected", "disabled"]} />;' },
		{ code: '<TouchableOpacity accessibilityState={["disabled", "selected"]} />;' }
	].map(parserOptionsMapper),
	invalid: [
		{
			code: '<TouchableOpacity accessibilityState="enabled" />',
			errors: [expectedError]
		},
		{
			code: '<TouchableOpacity accessibilityState="none" />;',
			errors: [expectedError]
		},
		{
			code: '<TouchableOpacity accessibilityState="primary-button" />',
			errors: [expectedError]
		}
	].map(parserOptionsMapper)
});
