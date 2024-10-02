/**
 * @fileoverview Enforce accessibilityIgnoresInvertColors property value is a boolean.
 * @author Dominic Coelho
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { generateObjSchema } from '../util/schemas';
import { elementType, getProp, hasProp } from 'jsx-ast-utils';
import type { JSXElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';
import isNodePropValueBoolean from '../util/isNodePropValueBoolean';

const propName = 'accessibilityIgnoresInvertColors';
const schema = generateObjSchema();

const defaultInvertableComponents = ['Image'];

const hasValidIgnoresInvertColorsProp = ({ attributes }) =>
  hasProp(attributes, propName) &&
  isNodePropValueBoolean(getProp(attributes, propName));

const checkParent = ({ openingElement, parent }) => {
  if (hasValidIgnoresInvertColorsProp(openingElement)) {
    return false;
  } else if (parent.openingElement) {
    return checkParent(parent);
  }
  return true;
};

type VerifyRNImageRes = {
  enableLinting: boolean,
  elementsToCheck: string[],
};

/**
 * @description varifies that the Image asset is imported from 'react-native' otherwise exits linting
 */
const verifyReactNativeImage = (text: string): VerifyRNImageRes => {
  const res: VerifyRNImageRes = {
    enableLinting: true,
    elementsToCheck: defaultInvertableComponents,
  };

  // Escape hatch for tests
  if (!text.match(new RegExp(/import/, 'g'))) {
    return res;
  }

  // Flow has issues with String.raw
  // $FlowFixMe
  const namedSelector = String.raw`(import\s{)(.*)(\bImage\b)(.*)(}\sfrom\s'react-native')`;
  // $FlowFixMe
  const es6moduleSelector = String.raw`(?<=Image as )(.*?)(?=} from 'react-native')`;

  const imageSourceReactNativeRegExp = new RegExp(`${namedSelector}`, 'gs');
  const imageSourceReactNativeAliasRegExp = new RegExp(
    `${es6moduleSelector}`,
    'gs'
  );

  const matchedImage = text.match(imageSourceReactNativeRegExp) || [];
  const matchedAliasImage = text.match(imageSourceReactNativeAliasRegExp) || [];

  res.enableLinting =
    matchedImage.length === 1 || matchedAliasImage.length === 1;

  if (matchedAliasImage.length === 1) {
    res.elementsToCheck = [matchedAliasImage[0].trim()];
  }

  return res;
};

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },
  functions: {
    verifyReactNativeImage,
  },

  create: ({ options, report, getSourceCode, sourceCode }: ESLintContext) => {
    /**
     * Checks to see if there are valid imports and if so verifies that those imports related to 'react-native' or if a custom module exists
     * */
    const { text } = sourceCode || getSourceCode();
    const { enableLinting, elementsToCheck } = verifyReactNativeImage(text);

    // Add in any other invertible components to check for
    if (options.length > 0) {
      const { invertableComponents } = options[0];
      if (invertableComponents) {
        elementsToCheck.push(...invertableComponents);
      }
    }

    // Exit process if there is nothing to check
    if (!enableLinting && options.length === 0) {
      return {};
    }

    return {
      JSXElement: (node: JSXElement) => {
        // $FlowFixMe
        const { children, openingElement, parent } = node;

        if (
          hasProp(openingElement.attributes, propName) &&
          !isNodePropValueBoolean(getProp(openingElement.attributes, propName))
        ) {
          report({
            node,
            message:
              'accessibilityIgnoresInvertColors prop is not a boolean value',
          });
        } else {
          if (options.length > 0) {
            const { invertableComponents } = options[0];
            if (invertableComponents) {
              elementsToCheck.push(...invertableComponents);
            }
          }

          const type = elementType(openingElement);

          if (
            elementsToCheck.indexOf(type) > -1 &&
            !hasValidIgnoresInvertColorsProp(openingElement) &&
            children.length === 0
          ) {
            let shouldReport = true;

            if (parent.openingElement) {
              shouldReport = checkParent(parent);
            }

            if (shouldReport) {
              report({
                node,
                message:
                  'Found an element which will be inverted. Add the accessibilityIgnoresInvertColors prop',
              });
            }
          }
        }
      },
    };
  },
};
