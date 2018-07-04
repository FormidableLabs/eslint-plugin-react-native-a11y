/* eslint-disable global-require */

module.exports = {
  rules: {
    'accessible-touchable': require('./rules/accessible-touchable'),
    'accessibility-label': require('./rules/accessibility-label'),
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
        'react-native-a11y/accessibility-label': 'error',
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
        'react-native-a11y/accessibility-label': 'error',
      },
    },
  },
};
