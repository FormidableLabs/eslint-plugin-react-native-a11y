/* eslint-env jest */
/**
 * @fileoverview $DESCRIPTION
 * @author $AUTHOR
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/touchable-props-are-valid';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'accessibilityTraits must be one of defined values',
  type: 'JSXAttribute',
};

ruleTester.run('touchable-props-are-valid', rule, {
  valid: [
    { code: '<TouchableOpacity accessibilityTraits="none" />;' },
    { code: '<TouchableOpacity accessibilityTraits="button" />;' },
    { code: '<TouchableOpacity accessibilityTraits="link" />;' },
    { code: '<TouchableOpacity accessibilityTraits="header" />;' },
    { code: '<TouchableOpacity accessibilityTraits="search" />;' },
    { code: '<TouchableOpacity accessibilityTraits="image" />;' },
    { code: '<TouchableOpacity accessibilityTraits="selected" />;' },
    { code: '<TouchableOpacity accessibilityTraits="plays" />;' },
    { code: '<TouchableOpacity accessibilityTraits="key" />;' },
    { code: '<TouchableOpacity accessibilityTraits="text" />;' },
    { code: '<TouchableOpacity accessibilityTraits="summary" />;' },
    { code: '<TouchableOpacity accessibilityTraits="disabled" />;' },
    { code: '<TouchableOpacity accessibilityTraits="frequentUpdates" />;' },
    { code: '<TouchableOpacity accessibilityTraits="startsMedia" />;' },
    { code: '<TouchableOpacity accessibilityTraits="adjustable" />;' },
    {
      code:
        '<TouchableOpacity accessibilityTraits="allowsDirectInteraction" />;',
    },
    { code: '<TouchableOpacity accessibilityTraits="pageTurn" />;' },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<TouchableOpacity accessibilityTraits="duck" />',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityTraits="non" />;',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityTraits="nones" />;',
      errors: [expectedError],
    },
    {
      code: '<TouchableOpacity accessibilityTraits="nonebutton" />',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
