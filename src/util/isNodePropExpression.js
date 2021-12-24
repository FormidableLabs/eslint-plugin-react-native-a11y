// @flow
import type { JSXAttribute } from 'ast-types-flow';

const ALLOWED_TYPES = [
  'Identifier',
  'CallExpression',
  'ConditionalExpression',
  'MemberExpression',
];

export default function isattrPropExpression(attr: JSXAttribute): boolean {
  // $FlowFixMe
  const expression = attr.value?.expression;
  // $FlowFixMe
  return expression && ALLOWED_TYPES.includes(expression.type);
}
