import type { RuleTester } from 'eslint';
import deepmerge from 'deepmerge';

const defaultLanguageOptions = {
  ecmaVersion: 2020,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

const languageOptionsMapper = (
  testCase: RuleTester.ValidTestCase | RuleTester.InvalidTestCase,
) => ({
  ...testCase,
  errors: (<RuleTester.InvalidTestCase>testCase).errors,
  options: testCase.options ?? [],
  languageOptions: deepmerge(
    defaultLanguageOptions,
    testCase.languageOptions ?? {},
  ),
});

export default languageOptionsMapper;
