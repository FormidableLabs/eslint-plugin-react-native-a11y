/* eslint-disable global-require */

module.exports = {
  rules: {
    'accessible-touchable': require('./rules/accessible-touchable'),
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
