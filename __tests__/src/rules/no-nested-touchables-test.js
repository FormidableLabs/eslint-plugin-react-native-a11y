/* eslint-env jest */
/**
 * @fileoverview Enforce if a view has accessible={true}, that there are no clickable elements inside
 * @author Alex Saunders
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/no-nested-touchables';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message:
    'Elements with accessible={true} must not have any clickable elements inside',
  type: 'JSXOpeningElement',
};

ruleTester.run('no-nested-touchables', rule, {
  valid: [
    {
      code: `<TouchableOpacity
      accessibilityTraits="button"
      accessibilityComponentType="button"
      accessibilityLabel="Tap Me!"
      accessible={true}
    />`,
    },
    {
      code: `<TouchableOpacity
      accessibilityTraits="button"
      accessibilityComponentType="button"
      accessibilityLabel="Tap Me!"
      accessible={true}
    ><Text>submit</Text><View><Text>cancel</Text></View></TouchableOpacity>`,
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: `<TouchableOpacity
                accessibilityTraits="button"
                accessibilityComponentType="button"
                accessibilityLabel="Tap Me!"
                accessible={true}
              >
                <Button />
              </TouchableOpacity>`,
      errors: [expectedError],
    },
    {
      code: `<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
><View><Text><Button>button</Button></Text></View></TouchableOpacity>`,
      errors: [expectedError],
    },
    {
      code: `<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
><TouchableOpacity><Text>Nested</Text></TouchableOpacity></TouchableOpacity>`,
      errors: [expectedError],
    },
    {
      code: `<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
><Pressable><Text>Nested</Text></Pressable></TouchableOpacity>`,
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
