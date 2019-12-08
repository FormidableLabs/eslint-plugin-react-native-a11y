/**
 * @fileoverview Describes the current state of a component to the user of an assistive technology.
 * @author JP Driver
 * @flow
 */

import type { JSXAttribute } from 'ast-types-flow';
import { elementType, getPropValue, getLiteralPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { ESLintContext } from '../../flow/eslint';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const validKeys = ['disabled', 'selected', 'checked', 'busy', 'expanded'];

module.exports = {
  meta: {
    docs: {},
    schema: [generateObjSchema()]
  },

  create: (context: ESLintContext) => ({
    JSXAttribute: (node: JSXAttribute) => {
      const attrName = elementType(node);
      if (attrName === 'accessibilityState') {
        const attrValue = getPropValue(node);
        const test = getLiteralPropValue(node);

        const error = message =>
          context.report({
            node,
            message
          });

        if (typeof attrValue !== 'object' || Array.isArray(attrValue)) {
          error('accessibilityState must be an object');
        } else {
          Object.entries(attrValue).map(([key, value]) => {
            if (validKeys.indexOf(key) < 0) {
              error(`accessibilityState object: "${key}" is not a valid key`);
            } else if (key !== 'checked' && typeof value !== 'boolean') {
              error(
                `accessibilityState object: "${key}" value is not a boolean`
              );
            } else if (
              key === 'checked' &&
              !(typeof value === 'boolean' || value === 'mixed')
            ) {
              error(
                `accessibilityState object: "checked" value is not either a boolean or 'mixed'`
              );
            }
          });
        }
      }
    }
  })
};
