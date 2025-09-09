/**
 * @fileoverview Enforce that <Touchable\*> components only have either the accessibilityRole prop or both accessibilityTraits and accessibilityComponentType props set
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import {
  hasProp,
  hasAnyProp,
  hasEveryProp,
  getProp,
  getLiteralPropValue,
  elementType,
} from 'jsx-ast-utils';
import type { Rule } from 'eslint';
import isTouchable from '../util/isTouchable';
import type { JSXOpeningElement } from 'estree-jsx';

const deprecatedProps = ['accessibilityTraits', 'accessibilityComponentType'];

export default {
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

  create: (context: Rule.RuleContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (
        isTouchable(node, context) &&
        hasAnyProp(node.attributes, deprecatedProps) &&
        (hasProp(node.attributes, 'accessibilityRole') ||
          !hasEveryProp(node.attributes, deprecatedProps)) &&
        getLiteralPropValue(getProp(node.attributes, 'accessible')!) !== false
      ) {
        context.report({
          node,
          message: `<${elementType(node)}> must only have either the accessibilityRole prop or both accessibilityTraits and accessibilityComponentType props set`,
        });
      }
    },
  }),
};
