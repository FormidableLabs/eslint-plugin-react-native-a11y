/* eslint-disable global-require */

module.exports = {
  rules: {
    'has-accessibility-props': require('./rules/has-accessibility-props'),
    'has-valid-accessibility-traits': require('./rules/has-valid-accessibility-traits'),
    'accessibility-label': require('./rules/accessibility-label'),
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
        'react-native-a11y/has-accessibility-props': 'error',
        'react-native-a11y/has-valid-accessibility-traits': 'error',
        'react-native-a11y/accessibility-label': 'error',
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
        'react-native-a11y/has-accessibility-props': 'error',
        'react-native-a11y/accessible-touchable': 'error',
        'react-native-a11y/accessibility-label': 'error',
      },
    },
  },
};
