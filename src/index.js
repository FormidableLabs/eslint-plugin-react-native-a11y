/* eslint-disable global-require */

module.exports = {
  rules: {
    'accessible-touchable': require('./rules/accessible-touchable'),
    'no-nested-touchables': require('./rules/no-nested-touchables'),
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react-native-a11y/accessible-touchable': 'error',
        'react-native-a11y/no-nested-touchables': 'error',
      },
    },
    strict: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react-native-a11y/accessible-touchable': 'error',
      },
    },
  },
};
