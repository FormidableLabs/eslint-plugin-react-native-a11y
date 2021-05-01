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

describe('verifyReactNativeImage', () => {
  it('returns true when importing a named export of Image from react-native', () => {
    const output = rule.functions
      .verifyReactNativeImage(`import { Text, Image, View } from 'react-native';
  const Component = () => (
    <View>
    <Image />
    </View>
    );`);

    expect(output.enableLinting).toBe(true);
  });

  it('returns false when importing a named export of a Image from any other library', () => {
    const output = rule.functions
      .verifyReactNativeImage(`import { Text, Image, View } from './custom-image-component/Image';
      const Component = () => (
        <View>
        <Image />
        </View>
        );`);
    expect(output.enableLinting).toBe(false);
  });

  /**
   * Super edge case if someone wants to alias ReactNative.Image as another component like RNImage and imports an Image from './any-library'
   */
  it('returns true when provided a named export of Image that is aliased as something from react-native', () => {
    const output = rule.functions
      .verifyReactNativeImage(`import React from 'react'
    import {Image as RNImage} from 'react-native'
    
    const CustomImage = () => {
      return <RNImage />
    }
    
    export default CustomImage`);

    expect(output.enableLinting).toBe(true);
  });
});

const validCustomImportTests = [
  {
    title: 'does not throw an error with custom Image components',
    code: `import { Text, Image, View } from './custom-image-component/Image';
              const Component = () => (
                <View>
                  <Image />
                </View>
              );`,
    parserOptions: {
      sourceType: 'module',
    },
  },
];

const validCases = [
  ...validCustomImportTests,
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
];

const invalidCustomImport = [
  {
    title:
      'throws a missing prop error for custom components alongside passing Image that is imported from react-native',
    code: `import {
    Image,
    Button,
    FlatList,
    Platform,
    ScrollView,
    View,
  } from 'react-native';
  import FastImage from './components/FastImage'
  const Component = () => (
    <View>
      <FastImage accessibilityIgnoresInvertColors />
      <Image />
    </View>
  );`,
    errors: [missingPropError],
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title:
      'throws a missingPropError for invertibleComponents and type error for Image when it is imported from react-native',
    code: `import {
    Image,
    Button,
    FlatList,
    Platform,
    ScrollView,
    View,
  } from 'react-native';
  import FastImage from './components/FastImage'
  const Component = () => (
    <View>
      <FastImage />
      <Image accessibilityIgnoresInvertColors={'true'} />
    </View>
  );`,
    errors: [missingPropError, typeError],
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title: 'can throw multiple errors for custom and normal Image components',
    code: `import {
    Image,
    Button,
    FlatList,
    Platform,
    ScrollView,
    View,
  } from 'react-native';
  import FastImage from './components/FastImage'
  const Component = () => (
    <View>
      <FastImage />
      <FastImage accessibilityIgnoresInvertColors={'true'} />
      <FastImage accessibilityIgnoresInvertColors={'false'} />
      <Image />
      <Image accessibilityIgnoresInvertColors={'true'} />
      <Image accessibilityIgnoresInvertColors={'false'} />
    </View>
  );`,
    errors: [
      missingPropError,
      typeError,
      typeError,
      missingPropError,
      typeError,
      typeError,
    ],
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title: 'should fail',
    code: `import React from 'react'
    import { Image } from 'react-native';

    export const RNImage = (props) => <Image source={props.source} />
    `,
    errors: [missingPropError],
    parserOptions: {
      sourceType: 'module',
    },
  },
  {
    title:
      'supports linting on Custom Invertable ImageComponents without react-native imported',
    code: `import { FastImage } from './fast-image'
  
  const Component = (props) => (
    <>
      <FastImage />
      <FastImage accessibilityIgnoresInvertColors={'true'} />
    </>
  );
  `,
    errors: [missingPropError, typeError],
    parserOptions: {
      sourceType: 'module',
    },
    options: [
      {
        invertableComponents: ['FastImage'],
      },
    ],
  },
];

const invalidCases = [
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
  ...invalidCustomImport,
];

/**
 * Solution to rule tester's dynamic title issue
 */
RuleTester.describe = function (text, method) {
  RuleTester.testId = 0;
  RuleTester.it.title = text;

  method.bind({ testId: 0 });

  describe(`${RuleTester.it.title}`, method);
};

RuleTester.it = function (text, method) {
  const computedTitle = eval(`${RuleTester.it.title}Cases`)[RuleTester.testId]
    .title;

  if (computedTitle) {
    describe(computedTitle, () => {
      it(text, method);
    });
  } else {
    it(text, method);
  }

  RuleTester.testId += 1;
};

ruleTester.run('has-valid-accessibility-ignores-invert-colors', rule, {
  valid: validCases.map(parserOptionsMapper),
  invalid: invalidCases.map(parserOptionsMapper),
});
