/* eslint-env jest */
/**
 * @fileoverview Enforce accessibilityComponentType property value is valid
 * @author Alex Saunders
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-component-type';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message:
    'accessibilityComponentType value is not valid.\n\nSee valid values: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/docs/rules/has-valid-accessibility-component-type.md',
  type: 'JSXAttribute',
};

ruleTester.run('has-valid-accessibility-component-type', rule, {
  valid: [
    { code: '<TouchableOpacity accessibilityComponentType="none" />;' },
    { code: '<TouchableOpacity accessibilityComponentType="button" />;' },
    {
      code:
        '<TouchableOpacity accessibilityComponentType="radiobutton_checked" />;',
    },
    {
      code:
        '<TouchableOpacity accessibilityComponentType="radiobutton_unchecked" />;',
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<TouchableOpacity accessibilityComponentType="duck" />',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityComponentType="non" />;',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityComponentType="nones" />;',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityComponentType="primary-button" />',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
