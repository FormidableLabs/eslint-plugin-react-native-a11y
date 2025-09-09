// @flow
import type { JSXOpeningElement, JSXElement } from 'estree-jsx';

/**
 * Recursively searches for an child element within a
 * JSXOpeningElement that matches the condition specificed in
 * `callback`
 */
export default function findChild(
  node: JSXElement,
  callback: (child: JSXOpeningElement) => boolean,
): JSXOpeningElement | null {
  const { children } = node;
  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i] as JSXElement;
      if (
        child.openingElement &&
        child.openingElement.name &&
        callback(child.openingElement)
      )
        return child.openingElement;
      const foundChild = findChild(child, callback);
      if (foundChild) return foundChild;
    }
  }
  return null;
}
