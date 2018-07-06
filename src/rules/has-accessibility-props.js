
/**
 * @fileoverview Enforce all <Touchable*> components have accessibilityTraits and accessibilityComponentType props set
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXOpeningElement } from 'ast-types-flow';
import { hasEveryProp } from 'jsx-ast-utils';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';
import isTouchable from '../util/isTouchable';

const errorMessage = '<Touchable*> components must have both the accessibilityTraits and accessibilityComponentType prop';

const schema = generateObjSchema();

const reqProps = ['accessibilityTraits', 'accessibilityComponentType'];

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (isTouchable(node)) {
        if (!hasEveryProp(node.attributes, reqProps)) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    },
  }),
};
