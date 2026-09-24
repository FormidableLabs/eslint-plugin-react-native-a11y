export const parser = 'flow';

export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const s = j(file.source);
  const { ruleName, rulePath } = options || {};

  const nameSort = (a, b) => {
    const aName = a.key.type === 'Literal' ? a.key.value : a.key.name;
    const bName = b.key.type === 'Literal' ? b.key.value : b.key.name;
    if (aName < bName) {
      return -1;
    }
    if (bName < aName) {
      return 1;
    }
    return 0;
  };

  let changesMade = 0;

  const rulePathInSrc = `./${rulePath.match(/src\/(.*)\.js/)[1]}`;

  const findConstObject = (name) =>
    s.find(j.VariableDeclarator, { id: { type: 'Identifier', name } });

  // Register the rule implementation in `const rules = { ... }`.
  changesMade += findConstObject('rules').forEach((path) => {
    path.value.init.properties.unshift(
      j.property(
        'init',
        j.literal(ruleName),
        j.callExpression(j.identifier('require'), [j.literal(rulePathInSrc)]),
      ),
    );
    path.value.init.properties.sort(nameSort);
  }).length;

  // Default it to "error" in `const basicRules = { ... }`.
  changesMade += findConstObject('basicRules').forEach((path) => {
    path.value.init.properties.unshift(
      j.property(
        'init',
        j.literal(`react-native-a11y/${ruleName}`),
        j.literal('error'),
      ),
    );
    path.value.init.properties.sort(nameSort);
  }).length;

  if (changesMade === 0) {
    return null;
  }

  return s.toSource({
    quote: 'single',
    trailingComma: true,
  });
}
