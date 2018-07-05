/**
 * Returns boolean indicating whether a JSXOpeningElement
 * is a <Touchable*> element
 * @flow
 */

import type { JSXOpeningElement } from 'ast-types-flow';
import { elementType } from 'jsx-ast-utils';

const touchables = [
  'TouchableOpacity',
  'TouchableHighlight',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
];

export default function isTouchable(element: JSXOpeningElement) {
  return new RegExp(`^(${touchables.join('|')})$`).test(elementType(element));
}
