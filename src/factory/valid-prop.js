// @flow

import type { JSXAttribute } from 'ast-types-flow';
import { elementType, getLiteralPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { ESLintContext } from '../../flow/eslint';
import isOneOf from '../util/isOneOf';
import isNodePropExpression from '../util/isNodePropExpression';

/**
 * Produces an ESLint rule that validates a prop against an array of acceptable values
 *
 * @param {string} propName Name of prop to validate
 * @param {Array<string>} validValues Array of possible valid values
 * @param {string} errorMessage Error message to present if prop is not a valid value
 */
const createValidPropRule = (
  propName: string,
  validValues: Array<string>,
  errorMessage: string,
  meta?: Object,
  create?: Object
) => ({
  meta: {
    docs: {},
    schema: [generateObjSchema()],
    ...meta,
  },

  create: (context: ESLintContext) => ({
    JSXAttribute: (node: JSXAttribute) => {
      const attrName = elementType(node);
      if (attrName === propName) {
        const isExpression = isNodePropExpression(node);
        if (!isExpression) {
          // ensure we are only checking literal prop values
          const attrValue = getLiteralPropValue(node);
          if (attrValue !== null) {
            let invalid = false;

            if (Array.isArray(attrValue)) {
              const validate = attrValue.map((strValue) =>
                isOneOf(strValue, validValues)
              );
              invalid = validate.indexOf(false) > -1;
            } else {
              invalid = !isOneOf(attrValue, validValues);
            }

            if (invalid) {
              context.report({
                node,
                message: errorMessage,
              });
            }
          }
        }
      }
    },
    ...create,
  }),
});

export default createValidPropRule;
