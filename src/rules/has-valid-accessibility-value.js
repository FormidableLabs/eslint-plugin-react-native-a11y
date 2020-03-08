/**
 * @fileoverview Represents the current value of a component.
 * @author JP Driver
 * @flow
 */

import type { JSXAttribute } from 'ast-types-flow';
import { elementType, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import type { ESLintContext } from '../../flow/eslint';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {},
    schema: [generateObjSchema()]
  },

  create: (context: ESLintContext) => ({
    JSXAttribute: (node: JSXAttribute) => {
      const attrName = elementType(node);
      if (attrName === 'accessibilityValue') {
        const attrValue = getPropValue(node);

        const error = message =>
          context.report({
            node,
            message
          });

        if (typeof attrValue !== 'object' || Array.isArray(attrValue)) {
          error('accessibilityValue must be an object');
        } else {
          const keys = Object.keys(attrValue);
          if (keys.indexOf('now') > -1 && keys.indexOf('min') < 0) {
            error('accessibilityValue object is missing min value');
          }
          if (keys.indexOf('now') > -1 && keys.indexOf('max') < 0) {
            error('accessibilityValue object is missing max value');
          }
          if (keys.indexOf('text') > -1 && keys.length > 1) {
            error(
              'accessibilityValue object must only contain either min, now, max *or* text'
            );
          }
          if (
            keys.indexOf('min') > -1 &&
            typeof attrValue['min'] !== 'number'
          ) {
            error('accessibilityValue min value must be an integer');
          }
          if (
            keys.indexOf('now') > -1 &&
            typeof attrValue['now'] !== 'number'
          ) {
            error('accessibilityValue now value must be an integer');
          }
          if (
            keys.indexOf('max') > -1 &&
            typeof attrValue['max'] !== 'number'
          ) {
            error('accessibilityValue max value must be an integer');
          }
          if (
            keys.indexOf('text') > -1 &&
            typeof attrValue['text'] !== 'string'
          ) {
            error('accessibilityValue text value must be a string');
          }
        }
      }
    }
  })
};
