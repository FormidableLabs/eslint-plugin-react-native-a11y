/**
 * @fileoverview Enforce accessibilityComponentType property value is valid
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXAttribute } from 'ast-types-flow';
import { elementType, getPropValue } from 'jsx-ast-utils';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';
import isOneOf from '../util/isOneOf';

const errorMessage = 'accessibilityComponentType must be one of defined values';

const schema = generateObjSchema();

const validValues = [
  'none',
  'button',
  'radiobutton_checked',
  'radiobutton_unchecked',
];

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXAttribute: (node: JSXAttribute) => {
      const attrName = elementType(node);
      if (isOneOf(attrName, ['accessibilityComponentType'])) {
        const attrValue = getPropValue(node);
        if (!isOneOf(attrValue, validValues)) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    },
  }),
};
