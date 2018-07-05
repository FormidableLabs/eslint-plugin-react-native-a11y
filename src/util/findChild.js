/**
 * Revursively searches for an child element within a
 * JSXOpeningElement that matches the condition specificed in
 * `callback`
 * @flow
 */

import type { JSXOpeningElement, JSXElement } from 'ast-types-flow';

export default function findChild(
  node: JSXElement,
  callback: (child: JSXOpeningElement) => boolean,
): ?JSXOpeningElement {
  const { children } = node;
  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      // $FlowFixMe
      const child: JSXElement = children[i];
      if (child.openingElement && child.openingElement.name) {
        if (callback(child.openingElement)) {
          return child.openingElement;
        }
      }
      findChild(child, callback);
    }
  }
  return null;
}
