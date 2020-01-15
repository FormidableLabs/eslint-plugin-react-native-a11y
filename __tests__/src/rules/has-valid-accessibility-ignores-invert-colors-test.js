/* eslint-env jest */
/**
 * @fileoverview Ensure that accessibilityIgnoresInvertColors property value is a boolean.
 * @author Dominic Coelho
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-ignores-invert-colors';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'accessibilityIgnoresInvertColors must be a boolean',
  type: 'JSXAttribute'
};

ruleTester.run('has-valid-accessibility-ignores-invert-colors', rule, {
  valid: [
    { code: '<View accessibilityIgnoresInvertColors></View>;' },
    { code: '<View accessibilityIgnoresInvertColors={true}></View>' },
    { code: '<View accessibilityIgnoresInvertColors={false}></View>' },
    {
      code: '<ScrollView accessibilityIgnoresInvertColors></ScrollView>'
    }
  ].map(parserOptionsMapper),
  invalid: [
    '<View accessibilityIgnoresInvertColors={0}></View>',
    '<View accessibilityIgnoresInvertColors={"true"}></View>',
    '<View accessibilityIgnoresInvertColors={"False"}></View>',
    `<View accessibilityIgnoresInvertColors={1}>
    <Image
      style={{width: 50, height: 50}}
      source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
    />
  </View>`,
    '<View accessibilityIgnoresInvertColors={{enabled: 1}}></View>',
    '<View accessibilityIgnoresInvertColors={{value: true}}></View>'
  ].map(code => parserOptionsMapper({ code, errors: [expectedError] }))
});
