/**
 * @fileoverview Enforce that views that have accessible={true}, also have an accessibilityLabel prop
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXOpeningElement } from 'ast-types-flow';
import { getProp } from 'jsx-ast-utils';
import getLiteralPropValue from 'jsx-ast-utils/lib/getPropValue';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';

const errorMessage = 'If an element has accessible={true}, it must also have a (non-empty) accessibilityLabel prop';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      const accessible = getProp(node.attributes, 'accessible');
      if (accessible) {
        const labelProp = getProp(node.attributes, 'accessibilityLabel');
        if (labelProp && labelProp.value) {
          const labelPropVal = getLiteralPropValue(labelProp);
          if (!labelPropVal) {
            context.report({
              node,
              message: errorMessage,
            });
          }
        } else {
          context.report({
            node,
            message: errorMessage,
          });
        }
      }
    },
  }),
};
