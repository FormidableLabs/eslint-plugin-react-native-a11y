/* eslint-env jest */
/**
 * @fileoverview Enforce importantForAccessibility property value is valid
 * @author Alex Saunders
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-important-for-accessibility';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'importantForAccessibility must be one of defined values',
  type: 'JSXAttribute',
};

ruleTester.run('has-valid-important-for-accessibility', rule, {
  valid: [
    { code: '<View importantForAccessibility="auto"/>' },
    { code: '<View importantForAccessibility="yes"/>' },
    { code: '<View importantForAccessibility="no"/>' },
    { code: '<View importantForAccessibility="no-hide-descendants"/>' },
    {
      code: '<View importantForAccessibility={isHidden ? "no-hide-descendants" : "yes"} />',
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<View importantForAccessibility="" />',
      errors: [expectedError],
    },
    {
      code: '<View importantForAccessibility="aut" />',
      errors: [expectedError],
    },
    {
      code: '<View importantForAccessibility="autoyes" />',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
