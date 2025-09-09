/**
 * @fileoverview An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not apparent from the accessibility label.
 * @author JP Driver
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { hasProp } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { Rule } from 'eslint';
import type { JSXOpeningElement } from 'estree-jsx';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: Rule.RuleContext) => ({
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
