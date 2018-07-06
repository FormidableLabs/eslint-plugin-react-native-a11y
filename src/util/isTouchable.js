/**
 * Returns boolean indicating whether a JSXOpeningElement
 * is a <Touchable*> element
 * @flow
 */

import type { JSXOpeningElement } from 'ast-types-flow';
import { elementType } from 'jsx-ast-utils';

const touchables = {
  TouchableOpacity: true,
  TouchableHighlight: true,
  TouchableWithoutFeedback: true,
  TouchableNativeFeedback: true,
  TouchableBounce: true,
};

export default function isTouchable(element: JSXOpeningElement) {
  return touchables[elementType(element)] === true;
}
