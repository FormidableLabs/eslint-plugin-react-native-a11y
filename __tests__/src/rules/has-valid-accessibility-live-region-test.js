/* eslint-env jest */
/**
 * @fileoverview Enforce  property value is valid

 * @author Alex Saunders
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-live-region';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '',
  type: 'JSXOpeningElement',
};

ruleTester.run('has-valid-accessibility-live-region', rule, {
  valid: [
    { code: '<div />;' },
  ].map(parserOptionsMapper),
  invalid: [].map(parserOptionsMapper),
});
