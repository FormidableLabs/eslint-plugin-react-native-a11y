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
import rule from '../../../src/rules/no-nested-clickables';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message:
    'Elements with accessible={true} must not have any clickable elements inside',
  type: 'JSXOpeningElement',
};

ruleTester.run('no-nested-clickables', rule, {
  valid: [
    {
      code:
        '<TouchableOpacity accessible={true} accessibilityLabel="Tap Me!"/>',
    },
    {
      code:
        '<TouchableOpacity accessible={true} accessibilityLabel="Tap Me!"><Text>submit</Text><View><Text>cancel</Text></View></TouchableOpacity>',
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code:
        '<TouchableOpacity accessible={true} accessibilityLabel="Tap Me!"><Button /></TouchableOpacity>',
      errors: [expectedError],
    },
    {
      code:
        '<TouchableOpacity accessible={true} accessibilityLabel="Tap Me!"><TouchableOpacity><Text>Nested</Text></TouchableOpacity></TouchableOpacity>',
      errors: [expectedError],
    },
  ].map(parserOptionsMapper),
});
