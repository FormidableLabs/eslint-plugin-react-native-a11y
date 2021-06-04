/**
 * @fileoverview Forbid "pressable" element without an explicit "accessibilityRole" attribute.
 * @author forxtu
 * @flow
 */

import { hasProp } from 'jsx-ast-utils';

// Utils
import { generateObjSchema } from '../util/schemas';

// Types
import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage =
  'Missing an explicit "accessibilityRole" attribute for pressable element';

const schema = generateObjSchema();

module.exports = {
  meta: {
    docs: {
      description:
        'Forbid "pressable" element without an explicit "accessibilityRole" attribute',
      category: 'Possible Errors',
      recommended: true,
      url:
        'https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/tree/master/docs/rules/pressable-has-accessibility-role.md',
    },
    fixable: null,
    schema: [schema],
  },
  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      const hasOnPressAttr = hasProp(node.attributes, 'onPress');
      const hasAccessibilityRoleAttr = hasProp(
        node.attributes,
        'accessibilityRole'
      );

      if (hasOnPressAttr && !hasAccessibilityRoleAttr) {
        context.report({
          node,
          message: errorMessage,
        });
      }
    },
  }),
};
