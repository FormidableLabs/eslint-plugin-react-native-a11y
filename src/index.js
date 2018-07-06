/* eslint-disable global-require */

module.exports = {
  rules: {
    'has-accessibility-props': require('./rules/has-accessibility-props'),
    'has-valid-accessibility-traits': require('./rules/has-valid-accessibility-traits'),
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react-native-a11y/has-accessibility-props': 'error',
        'react-native-a11y/has-valid-accessibility-traits': 'error',
      },
    },
    strict: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react-native-a11y/has-accessibility-props': 'error',
      },
    },
  },
};
