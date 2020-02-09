/**
 * @fileoverview Allow an assistive technology to programmatically invoke the actions of a component.
 * @author JP Driver
 * @flow
 */

import type { JSXOpeningElement } from 'ast-types-flow';
import { getProp, getPropValue, hasProp } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { ESLintContext } from '../../flow/eslint';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const standardActions = [
  'magicTap', // iOS only
  'escape', // iOS only
  'activate',
  'increment',
  'decrement',
  'longpress' // Android only
];

module.exports = {
  meta: {
    docs: {},
    schema: [generateObjSchema()]
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      const error = message =>
        context.report({
          node,
          message
        });

      if (hasProp(node.attributes, 'accessibilityActions')) {
        if (
          typeof getPropValue(
            getProp(node.attributes, 'onAccessibilityAction')
          ) !== 'function'
        ) {
          error(
            'accessibilityActions: has accessibilityActions but onAccessibilityAction is not a function'
          );
        }

        const attrValue = getPropValue(
          getProp(node.attributes, 'accessibilityActions')
        );

        if (!Array.isArray(attrValue)) {
          error('accessibilityActions: value must be an Array');
        } else if (attrValue.length === 0) {
          error('accessibilityActions: Array cannot be empty');
        } else {
          attrValue.forEach(action => {
            if (!action.name) {
              error('accessibilityActions: action missing name');
            } else if (
              standardActions.indexOf(action.name) < 0 &&
              !action.label
            ) {
              error(
                `accessibilityActions: custom action "${action.name}" missing label`
              );
            }
            if (
              Object.keys(action).filter(f => f !== 'name' && f !== 'label')
                .length > 0
            ) {
              error(
                `accessibilityActions: action "${action.name}" contains unrecognised keys`
              );
            }
          });
        }
      } else if (hasProp(node.attributes, 'onAccessibilityAction')) {
        error(
          'accessibilityActions: has onAccessibilityAction function but no accessibilityActions Array'
        );
      }
    }
  })
};
