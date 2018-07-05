const ruleBoilerplate = (author, description) => `/**
 * @fileoverview ${description}
 * @author ${author}
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';

const errorMessage = '';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
`;

module.exports = ruleBoilerplate;
