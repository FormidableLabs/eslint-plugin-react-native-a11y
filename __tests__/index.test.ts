import plugin from '../src';
import type { Rule } from 'eslint';

const rules = import.meta.glob<true, string, { default: Rule.RuleModule }>(
  '../src/rules/*.ts',
  { eager: true },
);

describe('all rule files should be exported by the plugin', () => {
  it.each(Object.entries(rules))(
    `exports %s`,
    (rulePath, { default: ruleModule }) => {
      const ruleName = rulePath.split('/').at(-1)?.replace('.ts', '');
      expect(plugin.rules[ruleName as keyof typeof plugin.rules]).toEqual(
        ruleModule,
      );
    },
  );
});

describe('configs', () => {
  it.each(['basic', 'ios', 'android', 'all'])(
    `exports a %s config`,
    (config) => {
      expect(
        plugin.configs[config as keyof typeof plugin.configs],
      ).toBeTruthy();
    },
  );
});

describe('schemas', () => {
  it.each(
    Object.entries(rules).filter(([filename]) => !filename.includes('index')),
  )(
    `%s exports a schema with type object`,
    async (_, { default: ruleModule }) => {
      const schema =
        ruleModule.meta &&
        ruleModule.meta.schema &&
        (ruleModule.meta.schema as { type: string }[])[0];

      expect((schema as { type: string }).type).toBe('object');
    },
  );
});
