// @flow

import { elementType, getLiteralPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import isOneOf from '../util/isOneOf';
import isNodePropExpression from '../util/isNodePropExpression';
import { type Rule } from 'eslint';
import type { JSXAttribute, JSXOpeningElement } from 'estree-jsx';

/**
 * Produces an ESLint rule that validates a prop against an array of acceptable values
 *
 * @param {string} propName Name of prop to validate
 * @param {Array<string>} validValues Array of possible valid values
 * @param {string} errorMessage Error message to present if prop is not a valid value
 */
const createValidPropRule = (
  propName: string,
  validValues: string[],
  errorMessage: string,
  meta?: object,
  create?: object,
) => ({
  meta: {
    docs: {},
    schema: [generateObjSchema()],
    ...meta,
  },

  create: (context: Rule.RuleContext) => ({
    JSXAttribute: (node: JSXAttribute | JSXOpeningElement) => {
      const attrName = elementType(node as JSXOpeningElement);
      if (attrName === propName) {
        const isExpression = isNodePropExpression(node as JSXAttribute);
        if (!isExpression) {
          // ensure we are only checking literal prop values
          const attrValue = getLiteralPropValue(<JSXAttribute>node);
          if (attrValue == null) return;
          let invalid = false;

          if (Array.isArray(attrValue)) {
            const validate = attrValue.map((strValue) =>
              isOneOf(strValue, validValues),
            );
            invalid = validate.indexOf(false) > -1;
          } else invalid = !isOneOf(attrValue?.toString(), validValues);

          if (invalid)
            context.report({
              node,
              message: errorMessage,
            });
        }
      }
    },
    ...create,
  }),
});

export default createValidPropRule;
