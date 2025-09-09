const testBoilerplate = (name, author, description) => `/* eslint-env jest */
/**
 * @fileoverview ${description}
 * @author ${author}
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import languageOptionsMapper from '../../__util__/languageOptionsMapper';
import rule from '../../../src/rules/${name}';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: '',
  type: 'JSXOpeningElement',
};

ruleTester.run('${name}', rule, {
  valid: [
    { code: '<View></View>;' },
  ].map(languageOptionsMapper),
  invalid: [].map(languageOptionsMapper),
});
`;

export default testBoilerplate;
