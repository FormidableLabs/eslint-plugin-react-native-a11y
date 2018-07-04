/* eslint-env jest */
/**
 * @fileoverview Enforce that views that have accessible={true}, also have an accessibilityLabel prop
 * @author Alex Saunders
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/accessibility-label';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message:
    'If an element has accessible={true}, it must also have a (non-empty) accessibilityLabel prop',
  type: 'JSXOpeningElement',
};

ruleTester.run('accessibility-label', rule, {
  valid: [
    {
      code:
        '<TouchableOpacity accessible={true} accessibilityLabel={"Tap me!"}/>',
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<TouchableOpacity accessible={true} />',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessible={true} accessibilityLabel/>',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessible={true} accessibilityLabel=""/>',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
