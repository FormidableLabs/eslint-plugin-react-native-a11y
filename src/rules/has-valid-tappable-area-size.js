/**
 * @fileoverview Ensure that all touchables have a min tappable area of 44.
 * @author Fernanda Toledo
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue, elementType } from 'jsx-ast-utils';

import { generateObjSchema } from '../util/schemas';
import isTouchable from '../util/isTouchable';

import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';

function errorMessage(touchable, heightTooSmall, widthTooSmall) {
  if (heightTooSmall && widthTooSmall) {
    return `<${touchable}> must have a size of at least 44 points x 44 points`;
  }

  if (heightTooSmall) {
    return `<${touchable}> must have a height of at least 44 points`;
  }

  if (widthTooSmall) {
    return `<${touchable}> must have a width of at least 44 points`;
  }
}

const MIN_TARGET_SIZE = 44;

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      description:
        'Forbid "pressable" element to have a size smaller than 44 px',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/tree/master/docs/rules/has-valid-tappable-area-size.md',
    },
    fixable: null,
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (isTouchable(node, context)) {
        const styleProp = getProp(node.attributes, 'style');
        const style = getPropValue(styleProp) || {};
        const { height, width, minHeight, minWidth } = style;

        const heightTooSmall =
          (Number(height) || 0) < MIN_TARGET_SIZE &&
          (Number(minHeight) || 0) < MIN_TARGET_SIZE;

        const widthTooSmall =
          (Number(width) || 0) < MIN_TARGET_SIZE &&
          (Number(minWidth) || 0) < MIN_TARGET_SIZE;

        if (heightTooSmall || widthTooSmall) {
          context.report({
            node,
            message: errorMessage(elementType(node)),
            heightTooSmall,
            widthTooSmall,
          });
        }
      }
    },
  }),
};
