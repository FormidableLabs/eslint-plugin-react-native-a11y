'use strict';

const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['node_modules/**', 'reports/**', 'lib/**'],
  },
  {
    // @babel/eslint-parser (v7) builds its ScopeManager from a fork of
    // eslint-scope@5, which predates the `addGlobals()` method ESLint v10
    // requires of custom ScopeManagers, so it crashes under ESLint v10.
    // hermes-eslint parses Flow directly and ships a ScopeManager that
    // already supports ESLint v9/v10.
    //
    // eslint-plugin-flowtype (its peerDependencies still cap out at ESLint 8)
    // also calls the removed `context.getAllComments()` shortcut, so its
    // rules can't run under ESLint v9/v10 at all; Flow type-checking is
    // still covered by `npm run flow` (flow-bin), which is unaffected by the
    // ESLint version.
    languageOptions: {
      parser: require('hermes-eslint'),
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-unused-vars': 1,
      'prettier/prettier': 'error',
    },
  },
  prettierConfig,
];
