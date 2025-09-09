/**
 * Returns boolean indicating whether a JSXOpeningElement
 * is a <Touchable*> element
 * @flow
 */

import type { Rule } from 'eslint';
import type { JSXOpeningElement } from 'estree-jsx';
import { elementType } from 'jsx-ast-utils';

const defaultTouchables = {
  Touchable: true,
  TouchableOpacity: true,
  TouchableHighlight: true,
  TouchableWithoutFeedback: true,
  TouchableNativeFeedback: true,
  TouchableBounce: true,
  Pressable: true,
};

export default function isTouchable(
  element: JSXOpeningElement,
  context: Rule.RuleContext,
) {
  const { options } = context;
  let extraTouchables: unknown[] = [];
  if (
    options[0] &&
    Object.prototype.hasOwnProperty.call(options[0], 'touchables')
  ) {
    const { touchables } = options[0];
    extraTouchables = [...touchables];
  }

  const elType = elementType(element) as keyof typeof defaultTouchables;
  return defaultTouchables[elType] || extraTouchables.includes(elType);
}
