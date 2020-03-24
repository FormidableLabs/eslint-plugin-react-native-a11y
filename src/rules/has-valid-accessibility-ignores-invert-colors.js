/**
 * @fileoverview Enforce accessibilityIgnoresInvertColors property value is a boolean.
 * @author Dominic Coelho
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { generateObjSchema } from '../util/schemas';
import { elementType, getProp, hasProp } from 'jsx-ast-utils';
import type { JSXElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';
import isNodePropValueBoolean from '../util/isNodePropValueBoolean';

const propName = 'accessibilityIgnoresInvertColors';
const schema = generateObjSchema();

const defaultInvertableComponents = ['Image'];

const hasValidIgnoresInvertColorsProp = ({ attributes }) =>
  hasProp(attributes, propName) &&
  isNodePropValueBoolean(getProp(attributes, propName));

const checkParent = ({ openingElement, parent }) => {
  if (hasValidIgnoresInvertColorsProp(openingElement)) {
    return false;
  } else if (parent.openingElement) {
    return checkParent(parent);
  }
  return true;
};

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: ({ options, report }: ESLintContext) => ({
    JSXElement: (node: JSXElement) => {
      // $FlowFixMe
      const { children, openingElement, parent } = node;

      if (
        hasProp(openingElement.attributes, propName) &&
        !isNodePropValueBoolean(getProp(openingElement.attributes, propName))
      ) {
        report({
          node,
          message:
            'accessibilityIgnoresInvertColors prop is not a boolean value',
        });
      } else {
        const elementsToCheck = defaultInvertableComponents;
        if (options.length > 0) {
          const { invertableComponents } = options[0];
          if (invertableComponents) {
            elementsToCheck.push(...invertableComponents);
          }
        }

        const type = elementType(openingElement);

        if (
          elementsToCheck.indexOf(type) > -1 &&
          !hasValidIgnoresInvertColorsProp(openingElement) &&
          children.length === 0
        ) {
          let shouldReport = true;

          if (parent.openingElement) {
            shouldReport = checkParent(parent);
          }

          if (shouldReport) {
            report({
              node,
              message:
                'Found an element which will be inverted. Add the accessibilityIgnoresInvertColors prop',
            });
          }
        }
      }
    },
  }),
};
