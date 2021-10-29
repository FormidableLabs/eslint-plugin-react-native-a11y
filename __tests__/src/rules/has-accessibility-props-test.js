/* eslint-env jest */
/**
 * @fileoverview Enforce that <Touchable\*> components only have either the accessibilityRole prop or both accessibilityTraits and accessibilityComponentType props set.
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

const expectedError = (touchable) => ({
  message: `<${touchable}> must only have either the accessibilityRole prop or both accessibilityTraits and accessibilityComponentType props set`,
  type: 'JSXOpeningElement',
});

ruleTester.run('has-accessibility-props', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<TouchableOpacit />;' },
    { code: '<TouchableOpacitys />;' },
    {
      code: '<Touchable accessibilityTraits="none" accessibilityComponentType="none"/>;',
    },
    {
      code: '<TouchableOpacity accessibilityTraits="none" accessibilityComponentType="none"/>;',
    },
    {
      code: '<TouchableHighlight accessibilityTraits="none" accessibilityComponentType="none"/>;',
    },
    {
      code: '<TouchableWithoutFeedback accessibilityTraits="none" accessibilityComponentType="none"/>;',
    },
    {
      code: '<TouchableNativeFeedback accessibilityTraits="none" accessibilityComponentType="none"/>;',
    },
    {
      code: '<div><TouchableNativeFeedback accessibilityTraits="none" accessibilityComponentType="none"/></div>;',
    },
    {
      code: '<div><TouchableNativeFeedback accessibilityRole="none"/></div>;',
    },
    {
      code: '<div><TouchableNativeFeedback accessible={false}/></div>;',
    },
    {
      code: '<div><TouchableNativeFeedback accessibilityRole="none"/></div>;',
    },
    {
      code: '<Touchable />;',
    },
    {
      code: '<TouchableOpacity />;',
    },
    {
      code: '<TouchableHighlight />;',
    },
    {
      code: '<TouchableWithoutFeedback />;',
    },
    {
      code: '<TouchableNativeFeedback />;',
    },
    {
      code: '<div><TouchableOpacity /></div>;',
    },
    {
      code: '<div><TouchableOpacity accessible={true}/></div>;',
    },
    {
      code: '<div><TouchableFoo accessible={true}/></div>;',
      options: [
        {
          touchables: ['TouchableFoo'],
        },
      ],
    },
    {
      code: '<div><FooTouchable accessible={true}/></div>;',
      options: [
        {
          touchables: ['FooTouchable'],
        },
      ],
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<TouchableOpacity accessibilityTraits="none"/>;',
      errors: [expectedError('TouchableOpacity')],
    },
    {
      code: '<TouchableOpacity accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableOpacity')],
    },
    {
      code: '<TouchableHighlight accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableHighlight')],
    },
    {
      code: '<TouchableHighlight accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableHighlight')],
    },
    {
      code: '<TouchableWithoutFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableWithoutFeedback')],
    },
    {
      code: '<TouchableWithoutFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableWithoutFeedback')],
    },
    {
      code: '<TouchableNativeFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableNativeFeedback')],
    },
    {
      code: '<TouchableNativeFeedback accessibilityComponentType="none"/>;',
      errors: [expectedError('TouchableNativeFeedback')],
    },
    {
      code: '<TouchableOpacity accessibilityRole="none" accessibilityComponentType="none" />;',
      errors: [expectedError('TouchableOpacity')],
    },
    {
      code: '<TouchableOpacity accessibilityRole="none" accessibilityTraits="none" />;',
      errors: [expectedError('TouchableOpacity')],
    },
    {
      code: '<TouchableOpacity accessibilityRole="none" accessibilityComponentType="none" accessibilityTraits="none" />;',
      errors: [expectedError('TouchableOpacity')],
    },
  ].map(parserOptionsMapper),
});
