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
import rule from '../../../src/rules/has-accessibility-props';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = touchable => ({
  message: `<${touchable}> must have the accessibilityRole prop, or both accessibilityComponentType and accessibilityTraits`,
  type: 'JSXOpeningElement'
});

ruleTester.run('has-accessibility-props', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<TouchableOpacit />;' },
    { code: '<TouchableOpacitys />;' },
    {
      code:
        '<Touchable accessibilityTraits="none" accessibilityComponentType="none"/>;'
    },
    {
      code:
        '<TouchableOpacity accessibilityTraits="none" accessibilityComponentType="none"/>;'
    },
    {
      code:
        '<TouchableHighlight accessibilityTraits="none" accessibilityComponentType="none"/>;'
    },
    {
      code:
        '<TouchableWithoutFeedback accessibilityTraits="none" accessibilityComponentType="none"/>;'
    },
    {
      code:
        '<TouchableNativeFeedback accessibilityTraits="none" accessibilityComponentType="none"/>;'
    },
    {
      code:
        '<div><TouchableNativeFeedback accessibilityTraits="none" accessibilityComponentType="none"/></div>;'
    },
    {
      code: '<div><TouchableNativeFeedback accessibilityRole="none"/></div>;'
    }
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<Touchable />;', errors: [expectedError('Touchable')] },
    {
      code: '<TouchableOpacity />;',
      errors: [expectedError('TouchableOpacity')]
    },
    {
      code: '<TouchableOpacity accessibilityTraits="none"/>;',
      errors: [expectedError('TouchableOpacity')]
    },
    {
      code: '<TouchableOpacity accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableOpacity')]
    },
    {
      code: '<TouchableHighlight />;',
      errors: [expectedError('TouchableHighlight')]
    },
    {
      code: '<TouchableHighlight accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableHighlight')]
    },
    {
      code: '<TouchableHighlight accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableHighlight')]
    },
    {
      code: '<TouchableWithoutFeedback />;',
      errors: [expectedError('TouchableWithoutFeedback')]
    },
    {
      code: '<TouchableWithoutFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableWithoutFeedback')]
    },
    {
      code: '<TouchableWithoutFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableWithoutFeedback')]
    },
    {
      code: '<TouchableNativeFeedback />;',
      errors: [expectedError('TouchableNativeFeedback')]
    },
    {
      code: '<TouchableNativeFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableNativeFeedback')]
    },
    {
      code: '<TouchableNativeFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableNativeFeedback')]
    },
    {
      code: '<div><TouchableOpacity /></div>;',
      errors: [expectedError('TouchableOpacity')]
    }
  ].map(parserOptionsMapper)
});
