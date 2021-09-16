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

const touchableHeightError = {
  message: '<TouchableOpacity> must have a height of at least 44 points',
  type: 'JSXOpeningElement',
};

const touchableWidthError = {
  message: '<TouchableOpacity> must have a width of at least 44 points',
  type: 'JSXOpeningElement',
};

const pressableHeightError = {
  message: '<Pressable> must have a height of at least 44 points',
  type: 'JSXOpeningElement',
};

const pressableWidthError = {
  message: '<Pressable> must have a width of at least 44 points',
  type: 'JSXOpeningElement',
};

ruleTester.run('has-valid-size', rule, {
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
      errors: [touchableHeightError],
    },
    {
      code: `<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
  style={{height: 43, width: 70}}
></TouchableOpacity>`,
      errors: [touchableHeightError],
    },
    {
      code: `<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
><TouchableOpacity><Text>Nested</Text></TouchableOpacity></TouchableOpacity>`,
      errors: [
        touchableHeightError,
        touchableWidthError,
        touchableHeightError,
        touchableWidthError,
      ],
    },
    {
      code: `<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
><Pressable><Text>Nested</Text></Pressable></TouchableOpacity>`,
      errors: [
        touchableHeightError,
        touchableWidthError,
        pressableHeightError,
        pressableWidthError,
      ],
    },
  ].map(parserOptionsMapper),
});
