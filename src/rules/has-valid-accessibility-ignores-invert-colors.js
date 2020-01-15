/**
 * @fileoverview Enforce accessibilityIgnoresInvertColors property value is a boolean.
 * @author Dominic Coelho
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXAttribute } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';
import { elementType } from 'jsx-ast-utils';

const propName = 'accessibilityIgnoresInvertColors';
const errorMessage = 'accessibilityIgnoresInvertColors must be a boolean';
const schema = generateObjSchema();

const isNodePropValueBoolean = node => {
  /**
   * Using `typeof getLiteralPropValue(node) === 'boolean'` with getLiteralPropValue/getPropValue
   * from `jsx-ast-utils` doesn't work as expected, because it "converts" strings `"true"` and `"false"`
   * to booleans `true` and `false`. This function aims to correctly identify uses of the string instead
   * of the boolean, so that we can correctly identify this error.
   */

  if (typeof node !== 'object' || !node.hasOwnProperty('value')) {
    // Loose check for correct data being passed in to this function
    throw new Error('isNodePropValueBoolean expects a node object as argument');
  }
  if (node.value === null) {
    // node.value is null when it is declared as a prop but not equal to anything. This defaults to `true` in JSX
    return true;
  }
  if (node.value.expression.type !== 'Literal') {
    // If not a literal, it cannot be a boolean
    return false;
  }
  return typeof node.value.expression.value === 'boolean';
};

module.exports = {
  meta: {
    docs: {},
    schema: [schema]
  },

  create: (context: ESLintContext) => ({
    JSXAttribute: (node: JSXAttribute) => {
      const attrName = elementType(node);
      if (attrName === propName) {
        if (isNodePropValueBoolean(node)) {
          // No error
          return;
        }
        context.report({
          node,
          message: errorMessage
        });
      }
    }
  })
};
