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

const typeError = {
  message: 'accessibilityIgnoresInvertColors prop is not a boolean value',
  type: 'JSXElement',
};

const missingPropError = {
  message:
    'Found an element which will be inverted. Add the accessibilityIgnoresInvertColors prop',
  type: 'JSXElement',
};

ruleTester.run('has-valid-accessibility-ignores-invert-colors', rule, {
  valid: [
    { code: '<View accessibilityIgnoresInvertColors></View>;' },
    { code: '<View accessibilityIgnoresInvertColors={true}></View>' },
    { code: '<View accessibilityIgnoresInvertColors={false}></View>' },
    {
      code: '<ScrollView accessibilityIgnoresInvertColors></ScrollView>',
    },
    {
      code: '<Image accessibilityIgnoresInvertColors />',
    },
    {
      code: '<View accessibilityIgnoresInvertColors><Image /></View>',
    },
    {
      code: '<View accessibilityIgnoresInvertColors><View><Image /></View></View>',
    },
    {
      code: '<View><View /></View>',
    },
    {
      code: '<FastImage accessibilityIgnoresInvertColors />',
      options: [
        {
          invertableComponents: ['FastImage'],
        },
      ],
    },
    {
      code: `const invertColors = true;

             const Component = () => (
               <Image accessibilityIgnoresInvertColors={invertColors} />
             );`,
    },
    {
      code: `<Image accessibilityIgnoresInvertColors={shouldInvert ? true : false} />`,
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: '<View accessibilityIgnoresInvertColors="true"></View>',
      errors: [typeError],
    },
    {
      code: '<View accessibilityIgnoresInvertColors={"true"}></View>',
      errors: [typeError],
    },
    {
      code: '<View accessibilityIgnoresInvertColors={"False"}></View>',
      errors: [typeError],
    },
    {
      code: '<View accessibilityIgnoresInvertColors={0}></View>',
      errors: [typeError],
    },
    {
      code: `<View accessibilityIgnoresInvertColors={1}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
      </View>`,
      errors: [typeError, missingPropError],
    },
    {
      code: '<View accessibilityIgnoresInvertColors={{enabled: 1}}></View>',
      errors: [typeError],
    },
    {
      code: '<View accessibilityIgnoresInvertColors={{value: true}}></View>',
      errors: [typeError],
    },
    {
      code: '<Image />',
      errors: [missingPropError],
    },
    {
      code: '<View><Image /></View>',
      errors: [missingPropError],
    },
    {
      code: '<View><View><Image /></View></View>',
      errors: [missingPropError],
    },
    {
      code: '<FastImage />',
      errors: [missingPropError],
      options: [
        {
          invertableComponents: ['FastImage'],
        },
      ],
    },
  ].map(parserOptionsMapper),
});
