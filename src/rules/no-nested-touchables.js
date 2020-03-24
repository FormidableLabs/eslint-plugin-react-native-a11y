/**
 * @fileoverview Enforce if a view has accessible={true}, that there are no clickable elements inside
 * @author Alex Saunders
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, getProp, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';
import isTouchable from '../util/isTouchable';
import findChild from '../util/findChild';

const errorMessage =
  'Elements with accessible={true} must not have any clickable elements inside';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const { parent } = node;

      const accessibleProp = getProp(node.attributes, 'accessible');
      const accessible = getPropValue(accessibleProp);

      if (accessible) {
        const clickableChild = findChild(
          parent,
          (child) =>
            isTouchable(child, context) || elementType(child) === 'Button'
        );
        if (clickableChild) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    },
  }),
};
