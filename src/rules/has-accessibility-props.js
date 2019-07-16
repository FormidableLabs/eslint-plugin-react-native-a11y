/**
 * @fileoverview Enforce all <Touchable*> components have accessibilityRole or accessibilityTraits and accessibilityComponentType props set
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXOpeningElement } from "ast-types-flow";
import { hasProp, hasEveryProp, elementType } from "jsx-ast-utils";
import type { ESLintContext } from "../../flow/eslint";
import isTouchable from "../util/isTouchable";

function errorMessage(touchable) {
  return `<${touchable}> must have the accessibilityRole prop, or both accessibilityComponentType and accessibilityTraits`;
}

const deprecatedProps = ["accessibilityTraits", "accessibilityComponentType"];

module.exports = {
  meta: {
    docs: {},
    schema: [
      {
        type: "object",
        additionalProperties: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        }
      }
    ]
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (isTouchable(node, context)) {
        if (
          !hasProp(node.attributes, "accessibilityRole") &&
          !hasEveryProp(node.attributes, deprecatedProps)
        ) {
          context.report({
            node,
            message: errorMessage(elementType(node))
          });
        }
      }
    }
  })
};
