/**
 * @fileoverview Enforce all <Touchable*> components have accessibilityTraits and accessibilityComponentType props set
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXOpeningElement } from 'ast-types-flow';
import { hasEveryProp, elementType } from 'jsx-ast-utils';
import type { ESLintContext } from '../../flow/eslint';
import isTouchable from '../util/isTouchable';

function errorMessage(touchable) {
  return `<${touchable}> must have both the accessibilityTraits and accessibilityComponentType prop`;
}

const reqProps = ['accessibilityTraits', 'accessibilityComponentType'];

module.exports = {
  meta: {
    docs: {},
    schema: [
      {
        type: 'object',
        additionalProperties: {
          type: 'array',
          items: {
            type: 'string',
          },
          uniqueItems: true,
        },
      },
    ],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (isTouchable(node, context)) {
        if (!hasEveryProp(node.attributes, reqProps)) {
          context.report({
            node,
            message: errorMessage(elementType(node)),
          });
        }
      }
    },
  }),
};
