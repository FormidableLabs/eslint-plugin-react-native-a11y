/**
 * @fileoverview Enforce `accessibilityLiveRegion` property value is valid

 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXAttribute } from 'ast-types-flow';
import { elementType, getPropValue } from 'jsx-ast-utils';
import type { ESLintContext } from '../../flow/eslint';
import isOneOf from '../util/isOneOf';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'accessibilityLiveRegion must be one of defined values';

const schema = generateObjSchema();

const validValues = ['none', 'polite', 'assertive'];

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXAttribute: (node: JSXAttribute) => {
      const attrName = elementType(node);
      if (isOneOf(attrName, ['accessibilityLiveRegion'])) {
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
