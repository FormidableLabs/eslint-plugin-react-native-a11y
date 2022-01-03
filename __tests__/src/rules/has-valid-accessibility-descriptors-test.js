/* eslint-env jest */
/**
 * @fileoverview Ensures that Touchable* components have appropriate props to communicate with assistive technologies
 * @author JP Driver
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-descriptors';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message:
    'Missing a11y props. Expected one of: accessibilityRole OR BOTH accessibilityLabel + accessibilityHint OR BOTH accessibilityActions + onAccessibilityAction',
  type: 'JSXOpeningElement',
};

ruleTester.run('has-valid-accessibility-descriptors', rule, {
  valid: [
    {
      code: '<View></View>;',
    },
    {
      code: `<Pressable accessibilityRole="button">
              <Text>Back</Text>
             </Pressable>`,
    },
    {
      code: `<TouchableOpacity
              accessibilityLabel="Accessibility label."
              accessibilityHint="Accessibility hint.">
              <Text>Back</Text>
             </TouchableOpacity>`,
    },
    {
      code: `<TouchableOpacity
              accessibilityActions={[
                {name: 'cut', label: 'cut'},
                {name: 'copy', label: 'copy'},
                {name: 'paste', label: 'paste'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                  case 'copy':
                    Alert.alert('Alert', 'copy action success');
                    break;
                  case 'paste':
                    Alert.alert('Alert', 'paste action success');
                    break;
                }
              }}
            />`,
    },
    {
      code: `<TextInput accessibilityLabel="Accessibility label." />`,
    },
    {
      code: `<TouchableOpacity accessible={false}>
              <Text>Back</Text>
             </TouchableOpacity>`,
    },
    {
      code: `<TouchableBounce {...props} hostRef={hostRef} />`,
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: `<TouchableOpacity>
              <Text>Back</Text>
             </TouchableOpacity>`,
      errors: [expectedError],
      output: `<TouchableOpacity accessibilityRole="button">
              <Text>Back</Text>
             </TouchableOpacity>`,
    },
    {
      code: `<TextInput />`,
      errors: [expectedError],
      output: `<TextInput accessibilityLabel="Text input field" />`,
    },
  ].map(parserOptionsMapper),
});
