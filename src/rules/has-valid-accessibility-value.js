/**
 * @fileoverview Represents the current value of a component.
 * @author JP Driver
 * @flow
 */

import type { JSXOpeningElement } from 'ast-types-flow';
import { getPropValue, hasProp } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { ESLintContext } from '../../flow/eslint';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const PROP_NAME = 'accessibilityValue';

module.exports = {
  meta: {
    docs: {},
    schema: [generateObjSchema()],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (hasProp(node.attributes, PROP_NAME)) {
        const valueProp = node.attributes.find(
          // $FlowFixMe
          (f) => f.name?.name === PROP_NAME
        );
        const valuePropType =
          // $FlowFixMe
          valueProp.value.expression?.type || valueProp.value.type;

        const error = (message) =>
          context.report({
            node,
            message,
          });

        if (valuePropType === 'Literal') {
          error('accessibilityValue must be an object');
        } else if (valuePropType === 'ObjectExpression') {
          const attrValue = getPropValue(valueProp);
          const keys = Object.keys(attrValue);

          // $FlowFixMe
          const properties = valueProp.value.expression?.properties || [];

          if (keys.includes('text')) {
            if (keys.length > 1) {
              error(
                'accessibilityValue object must only contain either min, now, max *or* text'
              );
            }
            // $FlowFixMe
            properties.forEach(({ key, value }) => {
              if (
                key.name === 'text' &&
                // $FlowFixMe
                value.type === 'Literal' &&
                // $FlowFixMe
                typeof value.value !== 'string'
              ) {
                error('accessibilityValue text value must be a string');
              }
            });
          } else {
            ['min', 'max', 'now'].forEach((key) => {
              if (!keys.includes(key)) {
                error(`accessibilityValue object is missing ${key} value`);
              }
            });

            // $FlowFixMe
            properties.forEach(({ key, value }) => {
              // $FlowFixMe
              if (value.type === 'Literal' && typeof value.value !== 'number') {
                error(
                  // $FlowFixMe
                  `accessibilityValue ${key.name} value must be an integer`
                );
              }
            });
          }
        }
      }
    },
  }),
};
