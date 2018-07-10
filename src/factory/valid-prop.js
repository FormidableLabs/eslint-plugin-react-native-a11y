// @flow
import type { JSXAttribute } from 'ast-types-flow';
import { elementType, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { ESLintContext } from '../../flow/eslint';
import isOneOf from '../util/isOneOf';

/**
 * Produces an ESLint rule that validates a prop against an array of acceptable values
 *
 * @param {string} propName Name of prop to validate
 * @param {Array<string>} validValues Array of possible valid values
 * @param {string} errorMessage Error message to present if prop is not a valid value
 */
const createValidPropRule = (
  propName: string = '',
  validValues: Array<string> = [],
  errorMessage: string = '',
) => ({
  meta: {
    docs: {},
    schema: [generateObjSchema()],
  },

  create: (context: ESLintContext) => ({
    JSXAttribute: (node: JSXAttribute) => {
      const attrName = elementType(node);
      if (attrName === propName) {
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
});

export default createValidPropRule;
