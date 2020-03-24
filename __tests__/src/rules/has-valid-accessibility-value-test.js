/* eslint-env jest */
/**
 * @fileoverview Represents the current value of a component.
 * @author JP Driver
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-value';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('has-valid-accessibility-value', rule, {
  valid: [
    {
      code:
        '<TouchableOpacity accessibilityValue={{ min: 0, now: 50, max: 100 }} />',
    },
    { code: '<TouchableOpacity accessibilityValue={{ text: "foo" }} />' },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code:
        '<TouchableOpacity accessibilityValue={{ min: 0, now: 50, max: 100, text: "foo" }} />',
      errors: [
        {
          message:
            'accessibilityValue object must only contain either min, now, max *or* text',
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code: '<TouchableOpacity accessibilityValue={{ now: 50 }} />',
      errors: [
        {
          message: 'accessibilityValue object is missing min value',
          type: 'JSXAttribute',
        },
        {
          message: 'accessibilityValue object is missing max value',
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code: '<TouchableOpacity accessibilityValue="foo" />',
      errors: [
        {
          message: 'accessibilityValue must be an object',
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code:
        '<TouchableOpacity accessibilityValue={{ min: "0", now: "50", max: "100" }} />',
      errors: [
        {
          message: 'accessibilityValue min value must be an integer',
          type: 'JSXAttribute',
        },
        {
          message: 'accessibilityValue now value must be an integer',
          type: 'JSXAttribute',
        },
        {
          message: 'accessibilityValue max value must be an integer',
          type: 'JSXAttribute',
        },
      ],
    },
    {
      code: '<TouchableOpacity accessibilityValue={{ text: 0 }} />',
      errors: [
        {
          message: 'accessibilityValue text value must be a string',
          type: 'JSXAttribute',
        },
      ],
    },
  ].map(parserOptionsMapper),
});
