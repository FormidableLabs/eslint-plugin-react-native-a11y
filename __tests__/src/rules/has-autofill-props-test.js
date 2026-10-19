/* eslint-env jest */
/**
 * @fileoverview Enforce that a TextInput with secureTextEntry declares autoComplete or textContentType so that password managers can offer to fill it.
 * @author Nobuhiko Kimoto
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-autofill-props';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message:
    'secureTextEntry is set but neither autoComplete nor textContentType is declared, so password managers cannot offer to fill this field',
  type: 'JSXOpeningElement',
};

ruleTester.run('has-autofill-props', rule, {
  valid: [
    {
      code: `<TextInput />`,
    },
    {
      code: `<TextInput autoComplete="username" />`,
    },
    {
      code: `<TextInput secureTextEntry autoComplete="current-password" />`,
    },
    {
      code: `<TextInput secureTextEntry autoComplete="new-password" />`,
    },
    {
      code: `<TextInput secureTextEntry textContentType="password" />`,
    },
    {
      code: `<TextInput secureTextEntry={true} textContentType="password" />`,
    },
    {
      // explicit opt-out is still a decision the developer made
      code: `<TextInput secureTextEntry autoComplete="off" />`,
    },
    {
      // not a password field
      code: `<TextInput secureTextEntry={false} />`,
    },
    {
      // the props may come from the spread
      code: `<TextInput secureTextEntry {...props} />`,
    },
    {
      code: `<TextInput secureTextEntry={isSecure} autoComplete="current-password" />`,
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: `<TextInput secureTextEntry />`,
      errors: [expectedError],
    },
    {
      code: `<TextInput secureTextEntry={true} />`,
      errors: [expectedError],
    },
    {
      code: `<TextInput secureTextEntry={isSecure} />`,
      errors: [expectedError],
    },
    {
      code: `<TextInput secureTextEntry importantForAutofill="yes" />`,
      errors: [expectedError],
    },
    {
      code: `<PasswordField secureTextEntry />`,
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
