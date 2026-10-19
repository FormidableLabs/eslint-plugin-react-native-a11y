/**
 * @fileoverview Enforce that a TextInput with secureTextEntry declares autoComplete or textContentType so that password managers can offer to fill it.
 * @author Nobuhiko Kimoto
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getLiteralPropValue, hasProp } from 'jsx-ast-utils';
import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';

const schema = generateObjSchema();

const errorMessage =
  'secureTextEntry is set but neither autoComplete nor textContentType is declared, so password managers cannot offer to fill this field';

// A spread attribute may carry the props we are looking for, so a spread
// counts as "declared" to avoid false positives.
const spreadLoose = { spreadStrict: false };

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXOpeningElement: (node: JSXOpeningElement) => {
      if (!hasProp(node.attributes, 'secureTextEntry')) {
        return;
      }

      // secureTextEntry={false} is not a password field
      const secureTextEntry = getProp(node.attributes, 'secureTextEntry');
      if (
        secureTextEntry.value !== null &&
        getLiteralPropValue(secureTextEntry) === false
      ) {
        return;
      }

      if (
        hasProp(node.attributes, 'autoComplete', spreadLoose) ||
        hasProp(node.attributes, 'textContentType', spreadLoose)
      ) {
        return;
      }

      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
