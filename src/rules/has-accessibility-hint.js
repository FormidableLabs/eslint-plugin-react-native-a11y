/**
 * @fileoverview An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not apparent from the accessibility label.
 * @author JP Driver
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { hasProp } from 'jsx-ast-utils';
import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        hasProp(node.attributes, 'accessibilityLabel') &&
        !hasProp(node.attributes, 'accessibilityHint')
      ) {
        context.report({
          node,
          message: 'has accessibilityLabel prop but no accessibilityHint',
        });
      }
    },
  }),
};
