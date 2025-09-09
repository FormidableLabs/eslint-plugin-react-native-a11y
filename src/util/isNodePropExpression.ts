// @flow
import type { JSXAttribute, JSXExpressionContainer } from 'estree-jsx';

const ALLOWED_TYPES = [
  'Identifier',
  'CallExpression',
  'ConditionalExpression',
  'MemberExpression',
];

export default function isattrPropExpression(attr: JSXAttribute): boolean {
  const expression = (attr.value as JSXExpressionContainer)?.expression;

  return expression && ALLOWED_TYPES.includes(expression.type);
}
