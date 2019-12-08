/* eslint-disable global-require */

module.exports = {
  rules: {
    'accessibility-label': require('./rules/accessibility-label'),
    'has-accessibility-props': require('./rules/has-accessibility-props'),
    'has-valid-accessibility-component-type': require('./rules/has-valid-accessibility-component-type'),
    'has-valid-accessibility-live-region': require('./rules/has-valid-accessibility-live-region'),
    'has-valid-accessibility-role': require('./rules/has-valid-accessibility-role'),
    'has-valid-accessibility-state': require('./rules/has-valid-accessibility-state'),
    'has-valid-accessibility-states': require('./rules/has-valid-accessibility-states'),
    'has-valid-accessibility-traits': require('./rules/has-valid-accessibility-traits'),
    'has-valid-important-for-accessibility': require('./rules/has-valid-important-for-accessibility'),
    'no-nested-touchables': require('./rules/no-nested-touchables')
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'react-native-a11y/accessibility-label': 'error',
        'react-native-a11y/has-accessibility-props': 'error',
        'react-native-a11y/has-valid-accessibility-component-type': 'error',
        'react-native-a11y/has-valid-accessibility-live-region': 'error',
        'react-native-a11y/has-valid-accessibility-role': 'error',
        'react-native-a11y/has-valid-accessibility-state': 'error',
        'react-native-a11y/has-valid-accessibility-states': 'error',
        'react-native-a11y/has-valid-accessibility-traits': 'error',
        'react-native-a11y/has-valid-important-for-accessibility': 'error',
        'react-native-a11y/no-nested-touchables': 'error'
      }
    },
    strict: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {}
    }
  }
};
