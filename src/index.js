/* eslint-disable global-require */

module.exports = {
  rules: {
    'touchable-has-props': require('./rules/touchable-has-props'),
    'touchable-props-are-valid': require('./rules/touchable-props-are-valid'),
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react-native-a11y/touchable-has-props': 'error',
        'react-native-a11y/touchable-props-are-valid': 'error',
      },
    },
    strict: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react-native-a11y/touchable-has-props': 'error',
      },
    },
  },
};
