/**
 * @fileoverview Enfore accessibilityTraits and accessibilityComponentType prop values must be valid
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXAttribute } from 'ast-types-flow';
import { elementType } from 'jsx-ast-utils';
import getPropValue from 'jsx-ast-utils/lib/getPropValue';
import type { ESLintContext } from '../../flow/eslint';
import isOneOf from '../util/isOneOf';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'accessibilityTraits must be one of defined values';

const schema = generateObjSchema();

const validValues = {
  accessibilityTraits: [
    'none',
    'button',
    'link',
    'header',
    'search',
    'image',
    'selected',
    'plays',
    'key',
    'text',
    'summary',
    'disabled',
    'frequentUpdates',
    'startsMedia',
    'adjustable',
    'allowsDirectInteraction',
    'pageTurn',
  ],
};

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXAttribute: (node: JSXAttribute) => {
      const attrName = elementType(node);
      if (isOneOf(attrName, ['accessibilityTraits'])) {
        const attrValue = getPropValue(node);
        if (!isOneOf(attrValue, validValues.accessibilityTraits)) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    },
  }),
};
