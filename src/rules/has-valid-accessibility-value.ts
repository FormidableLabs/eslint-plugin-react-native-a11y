/**
 * @fileoverview Represents the current value of a component.
 * @author JP Driver
 * @flow
 */

import type {
  JSXAttribute,
  JSXExpressionContainer,
  JSXOpeningElement,
  ObjectExpression,
  PrivateIdentifier,
  Property,
} from 'estree-jsx';
import { getPropValue, hasProp } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { Rule } from 'eslint';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const PROP_NAME = 'accessibilityValue';

export default {
  meta: {
    docs: {},
    schema: [generateObjSchema()],
  },

  create: (context: Rule.RuleContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (hasProp(node.attributes, PROP_NAME)) {
        const valueProp = node.attributes.find(
          (f) => (f as JSXAttribute).name?.name === PROP_NAME,
        ) as JSXAttribute;
        const valuePropType =
          (valueProp.value as JSXExpressionContainer).expression?.type ||
          valueProp.value?.type;

        const error = (message: string) => context.report({ node, message });

        if (valuePropType === 'Literal') {
          error('accessibilityValue must be an object');
        } else if (valuePropType === 'ObjectExpression') {
          const attrValue = getPropValue(valueProp as JSXAttribute) as Record<
            string,
            string
          >;
          const keys = Object.keys(attrValue);

          const properties = ((
            (valueProp.value as JSXExpressionContainer)
              .expression as ObjectExpression
          )?.properties ?? []) as Property[];

          if (keys.includes('text')) {
            if (keys.length > 1) {
              error(
                'accessibilityValue object must only contain either min, now, max *or* text',
              );
            }

            properties.forEach(({ key, value }) => {
              if (
                (key as PrivateIdentifier).name === 'text' &&
                value.type === 'Literal' &&
                typeof value.value !== 'string'
              )
                error('accessibilityValue text value must be a string');
            });
          } else {
            ['min', 'max', 'now'].forEach((key) => {
              if (!keys.includes(key))
                error(`accessibilityValue object is missing ${key} value`);
            });

            properties.forEach(({ key, value }) => {
              if (value.type === 'Literal' && typeof value.value !== 'number') {
                error(
                  `accessibilityValue ${(key as PrivateIdentifier).name} value must be an integer`,
                );
              }
            });
          }
        }
      }
    },
  }),
};
