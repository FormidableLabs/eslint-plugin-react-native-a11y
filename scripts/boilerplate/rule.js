const ruleBoilerplate = (author, description) => `/**
 * @fileoverview ${description}
 * @author ${author}
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXOpeningElement } from 'ast-types';
import type { Rule.RuleContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';

const errorMessage = '';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: Rule.RuleContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
`;

export default ruleBoilerplate;
