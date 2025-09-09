/**
 * @fileoverview Allow an assistive technology to programmatically invoke the actions of a component.
 * @author JP Driver
 * @flow
 */

import type { JSXAttribute, JSXOpeningElement } from 'estree-jsx';
import { getProp, getPropValue, hasEveryProp, hasProp } from 'jsx-ast-utils';
import isNodePropExpression from '../util/isNodePropExpression';
import { generateObjSchema } from '../util/schemas';
import type { Rule } from 'eslint';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const standardActions = [
  'magicTap', // iOS only
  'escape', // iOS only
  'activate',
  'increment',
  'decrement',
  'longpress', // Android only
];

export default {
  meta: {
    docs: {},
    schema: [generateObjSchema()],
  },

  create: (context: Rule.RuleContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      const error = (message: string) => context.report({ node, message });

      if (
        hasEveryProp(node.attributes, [
          'accessibilityActions',
          'onAccessibilityAction',
        ])
      ) {
        const handlerProp = getProp(
          node.attributes,
          'onAccessibilityAction',
        ) as JSXAttribute;
        const isHandlerExpression = isNodePropExpression(handlerProp);
        if (!isHandlerExpression) {
          const handlerPropValue = getPropValue(handlerProp);
          if (typeof handlerPropValue !== 'function') {
            error(
              'accessibilityActions: has accessibilityActions but onAccessibilityAction is not a function',
            );
          }
        }

        const actionsProp = getProp(
          node.attributes,
          'accessibilityActions',
        ) as JSXAttribute;
        const isActionsExpression = isNodePropExpression(actionsProp);
        if (!isActionsExpression) {
          const attrValue = getPropValue(actionsProp);

          if (!Array.isArray(attrValue))
            error('accessibilityActions: value must be an Array');
          else if (attrValue.length === 0)
            error('accessibilityActions: Array cannot be empty');
          else {
            attrValue.forEach((action) => {
              if (!action.name)
                error('accessibilityActions: action missing name');
              else if (
                standardActions.indexOf(action.name) < 0 &&
                !action.label
              )
                error(
                  `accessibilityActions: custom action "${action.name}" missing label`,
                );
              if (
                Object.keys(action).filter((f) => f !== 'name' && f !== 'label')
                  .length > 0
              )
                error(
                  `accessibilityActions: action "${action.name}" contains unrecognised keys`,
                );
            });
          }
        }
      } else {
        if (hasProp(node.attributes, 'accessibilityActions'))
          error(
            'accessibilityActions: has accessibilityActions but onAccessibilityAction is not a function',
          );
        else if (hasProp(node.attributes, 'onAccessibilityAction'))
          error(
            'accessibilityActions: has onAccessibilityAction function but no accessibilityActions Array',
          );
      }
    },
  }),
};
