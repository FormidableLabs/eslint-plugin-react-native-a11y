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
import type { Rule } from 'eslint';
import type { JSXAttribute, JSXElement, JSXOpeningElement } from 'estree-jsx';

const errorMessage =
  'Elements with accessible={true} must not have any clickable elements inside';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: Rule.RuleContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement & { parent: JSXElement }) => {
      const { parent } = node;

      const accessibleProp = getProp(
        node.attributes,
        'accessible',
      ) as JSXAttribute;
      const accessible = getPropValue(accessibleProp);

      if (accessible) {
        const clickableChild = findChild(
          parent,
          (child) =>
            isTouchable(child, context) || elementType(child) === 'Button',
        );
        if (clickableChild)
          context.report({
            node,
            message: errorMessage,
          });
      }
    },
  }),
};
