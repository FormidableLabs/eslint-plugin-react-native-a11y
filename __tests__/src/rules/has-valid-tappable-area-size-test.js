/* eslint-env jest */
/**
 * @fileoverview Ensure that all touchables have a min tappable area of 44.
 * @author Fernanda Toledo
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-tappable-area-size';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '<TouchableOpacity> must have at least 44 points of size',
  type: 'JSXOpeningElement',
};

const secondExpectedError = {
  message: '<Pressable> must have at least 44 points of size',
  type: 'JSXOpeningElement',
};

ruleTester.run('my-new-rule', rule, {
  valid: [
    {
      code: `<TouchableOpacity
      accessibilityTraits="button"
      accessibilityComponentType="button"
      accessibilityLabel="Tap Me!"
      accessible={true}
      style={{height: 44, width: 44}}
    />`,
    },
    {
      code: `<TouchableOpacity
      accessibilityTraits="button"
      accessibilityComponentType="button"
      accessibilityLabel="Tap Me!"
      accessible={true}
      style={{height: 60, width: 70}}
    ><Text>submit</Text><View><Text>cancel</Text></View></TouchableOpacity>`,
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: `<TouchableOpacity
                accessibilityTraits="button"
                accessibilityComponentType="button"
                accessibilityLabel="Tap Me!"
                accessible={true}
                style={{height: '50%', width: 54}}
              >
              </TouchableOpacity>`,
      errors: [expectedError],
    },
    {
      code: `<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
  style={{height: 43, width: 70}}
></TouchableOpacity>`,
      errors: [expectedError],
    },
    {
      code: `<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
><TouchableOpacity><Text>Nested</Text></TouchableOpacity></TouchableOpacity>`,
      errors: [expectedError, expectedError],
    },
    {
      code: `<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
><Pressable><Text>Nested</Text></Pressable></TouchableOpacity>`,
      errors: [expectedError, secondExpectedError],
    },
  ].map(parserOptionsMapper),
});
