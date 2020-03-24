/* eslint-env jest */
/**
 * @fileoverview Enforce  property value is valid

 * @author Alex Saunders
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-live-region';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'accessibilityLiveRegion must be one of defined values',
  type: 'JSXAttribute',
};

ruleTester.run('has-valid-accessibility-live-region', rule, {
  valid: [
    { code: '<Text accessibilityLiveRegion="none">Click Me</Text>' },
    { code: '<Text accessibilityLiveRegion="polite">Click Me</Text>' },
    { code: '<Text accessibilityLiveRegion="assertive">Click Me</Text>' },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<Text accessibilityLiveRegion >Click Me</Text>',
      errors: [expectedError],
    },
    {
      code: '<Text accessibilityLiveRegion="">Click Me</Text>',
      errors: [expectedError],
    },
    {
      code: '<Text accessibilityLiveRegion="non">Click Me</Text>',
      errors: [expectedError],
    },
    {
      code: '<Text accessibilityLiveRegion="nones">Click Me</Text>',
      errors: [expectedError],
    },
    {
      code: '<Text accessibilityLiveRegion="rude">Click Me</Text>',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
