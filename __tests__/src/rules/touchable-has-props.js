/* eslint-env jest */
/**
 * @fileoverview Enforce all <Touchable*> components have accessibilityTraits and accessibilityComponentType props set
 * @author Alex Saunders
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/touchable-has-props';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message:
    '<Touchable*> components must have both the accessibilityTraits and accessibilityComponentType prop',
  type: 'JSXOpeningElement',
};

ruleTester.run('touchable-has-props', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<TouchableOpacit />;' },
    { code: '<TouchableOpacitys />;' },
    {
      code:
        '<TouchableOpacity accessibilityTraits="none" accessibilityComponentType="none"/>;',
    },
    {
      code:
        '<TouchableHighlight accessibilityTraits="none" accessibilityComponentType="none"/>;',
    },
    {
      code:
        '<TouchableWithoutFeedback accessibilityTraits="none" accessibilityComponentType="none"/>;',
    },
    {
      code:
        '<TouchableNativeFeedback accessibilityTraits="none" accessibilityComponentType="none"/>;',
    },
    {
      code:
        '<div><TouchableNativeFeedback accessibilityTraits="none" accessibilityComponentType="none"/></div>;',
    },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<TouchableOpacity />;', errors: [expectedError] },
    {
      code: '<TouchableOpacity accessibilityTraits="none"/>;',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityComponentType="none"/>;',
      errors: [expectedError],
    },
    { code: '<TouchableHighlight />;', errors: [expectedError] },
    {
      code: '<TouchableHighlight accessibilityComponentType="none"/>;',
      errors: [expectedError],
    },
    {
      code: '<TouchableHighlight accessibilityComponentType="none"/>;',
      errors: [expectedError],
    },
    { code: '<TouchableWithoutFeedback />;', errors: [expectedError] },
    {
      code: '<TouchableWithoutFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError],
    },
    {
      code: '<TouchableWithoutFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError],
    },
    { code: '<TouchableNativeFeedback />;', errors: [expectedError] },
    {
      code: '<TouchableNativeFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError],
    },
    {
      code: '<TouchableNativeFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError],
    },
    { code: '<div><TouchableOpacity /></div>;', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
