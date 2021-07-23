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

function errorMessage(touchable) {
  return `<${touchable}> must have at least 44 points of size`;
}

const MIN_TARGET_SIZE = 44;

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
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
          });
        }
      }
    },
  }),
};
