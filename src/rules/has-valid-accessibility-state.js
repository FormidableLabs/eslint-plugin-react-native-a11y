/**
 * @fileoverview Describes the current state of a component to the user of an assistive technology.
 * @author JP Driver
 * @flow
 */

import type { JSXOpeningElement } from 'ast-types-flow';
import { hasProp } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { ESLintContext } from '../../flow/eslint';
import getPropValue from 'jsx-ast-utils/lib/getPropValue';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const PROP_NAME = 'accessibilityState';

const validKeys = ['disabled', 'selected', 'checked', 'busy', 'expanded'];

module.exports = {
  meta: {
    docs: {},
    schema: [generateObjSchema()],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (hasProp(node.attributes, PROP_NAME)) {
        const stateProp = node.attributes.find(
          // $FlowFixMe
          (f) => f.name?.name === PROP_NAME
        );
        const statePropType =
          // $FlowFixMe
          stateProp.value.expression?.type || stateProp.value.type;

        const error = (message) =>
          context.report({
            node,
            message,
          });

        if (
          statePropType === 'Literal' ||
          statePropType === 'ArrayExpression'
        ) {
          error('accessibilityState must be an object');
        } else if (statePropType === 'ObjectExpression') {
          const stateValue = getPropValue(stateProp);
          Object.entries(stateValue).map(([key, value]) => {
            if (!validKeys.includes(key)) {
              error(`accessibilityState object: "${key}" is not a valid key`);
            } else if (
              // we can't determine the associated value type of non-Literal expressions
              // treat these cases as though they are valid
              // $FlowFixMe
              stateProp.value.expression.properties.every(
                // $FlowFixMe
                (p) => p.value.type === 'Literal'
              )
            ) {
              if (
                key === 'checked' &&
                !(typeof value === 'boolean' || value === 'mixed')
              ) {
                error(
                  `accessibilityState object: "checked" value is not either a boolean or 'mixed'`
                );
              } else if (key !== 'checked' && typeof value !== 'boolean') {
                error(
                  `accessibilityState object: "${key}" value is not a boolean`
                );
              }
            }
          });
        }
      }
    },
  }),
};
