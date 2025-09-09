/**
 * @fileoverview Describes the current state of a component to the user of an assistive technology.
 * @author JP Driver
 * @flow
 */

import type {
  JSXAttribute,
  JSXExpressionContainer,
  JSXOpeningElement,
  ObjectExpression,
  Property,
} from 'estree-jsx';
import { getPropValue, hasProp } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { Rule } from 'eslint';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const PROP_NAME = 'accessibilityState';

const validKeys = ['disabled', 'selected', 'checked', 'busy', 'expanded'];

export default {
  meta: {
    docs: {},
    schema: [generateObjSchema()],
  },

  create: (context: Rule.RuleContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (hasProp(node.attributes, PROP_NAME)) {
        const stateProp = node.attributes.find(
          (f) => (f as JSXAttribute).name?.name === PROP_NAME,
        ) as JSXAttribute;
        const statePropType =
          (stateProp?.value as JSXExpressionContainer)?.expression?.type ||
          stateProp.value?.type;

        const error = (message: string) => context.report({ node, message });

        if (
          statePropType === 'Literal' ||
          statePropType === 'ArrayExpression'
        ) {
          error('accessibilityState must be an object');
        } else if (statePropType === 'ObjectExpression') {
          const stateValue = getPropValue(stateProp) as Record<string, string>;
          Object.entries(stateValue).map(([key, value]) => {
            if (!validKeys.includes(key)) {
              error(`accessibilityState object: "${key}" is not a valid key`);
            } else if (
              // we can't determine the associated value type of non-Literal expressions
              // treat these cases as though they are valid

              (
                (stateProp.value as JSXExpressionContainer)
                  ?.expression as ObjectExpression
              ).properties.every(
                (p) => (p as Property).value.type === 'Literal',
              )
            ) {
              if (
                key === 'checked' &&
                !(typeof value === 'boolean' || value === 'mixed')
              )
                error(
                  `accessibilityState object: "checked" value is not either a boolean or 'mixed'`,
                );
              else if (key !== 'checked' && typeof value !== 'boolean')
                error(
                  `accessibilityState object: "${key}" value is not a boolean`,
                );
            }
          });
        }
      }
    },
  }),
};
