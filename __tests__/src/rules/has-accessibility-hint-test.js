/* eslint-env jest */
/**
 * @fileoverview An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not apparent from the accessibility label.
 * @author JP Driver
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-accessibility-hint';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'has accessibilityLabel prop but no accessibilityHint',
  type: 'JSXOpeningElement',
};

ruleTester.run('has-accessibility-hint', rule, {
  valid: [
    {
      code: `<TouchableOpacity />`,
    },
    {
      code: `<TouchableOpacity
                accessibilityHint="Navigates to the previous screen"
              />`,
    },
    {
      code: `<TouchableOpacity
                accessibilityLabel="Go back"
                accessibilityHint="Navigates to the previous screen"
              />`,
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: `<TouchableOpacity
                accessibilityLabel="Go back"
              />`,
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
