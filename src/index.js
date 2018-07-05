/* eslint-disable global-require */

module.exports = {
  rules: {
    'accessible-touchable': require('./rules/accessible-touchable'),
    'no-nested-clickables': require('./rules/no-nested-clickables'),
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
        'react-native-a11y/no-nested-clickables': 'error',
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
