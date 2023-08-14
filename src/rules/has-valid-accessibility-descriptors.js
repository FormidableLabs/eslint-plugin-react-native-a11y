/**
 * @fileoverview Ensures that Touchable* components have appropriate props to communicate with assistive technologies
 * @author JP Driver
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXOpeningElement } from 'ast-types-flow';
import { elementType, hasAnyProp } from 'jsx-ast-utils';
import type { ESLintContext } from '../../flow/eslint';
import isTouchable from '../util/isTouchable';
import { generateObjSchema } from '../util/schemas';

const errorMessage =
  'Missing a11y props. Expected one of: accessibilityRole OR role OR BOTH accessibilityLabel + accessibilityHint OR BOTH accessibilityActions + onAccessibilityAction';

const schema = generateObjSchema();

const hasSpreadProps = (attributes) =>
  attributes.some((attr) => attr.type === 'JSXSpreadAttribute');

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
    fixable: 'code',
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (isTouchable(node, context) || elementType(node) === 'TextInput') {
        if (
          !hasAnyProp(node.attributes, [
            'role',
            'accessibilityRole',
            'accessibilityLabel',
            'accessibilityActions',
            'accessible',
          ]) &&
          !hasSpreadProps(node.attributes)
        ) {
          context.report({
            node,
            message: errorMessage,
            fix: (fixer) => {
              return fixer.insertTextAfterRange(
                // $FlowFixMe
                node.name.range,
                isTouchable(node, context)
                  ? ' accessibilityRole="button"'
                  : ' accessibilityLabel="Text input field"'
              );
            },
          });
        }
      }
    },
  }),
};
