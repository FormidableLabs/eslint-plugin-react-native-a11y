/* eslint-disable global-require */

const defaultConfig = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-native-a11y'],
};

const basicRules = {
  'react-native-a11y/has-accessibility-hint': 'error',
  'react-native-a11y/has-accessibility-props': 'error',
  'react-native-a11y/has-valid-accessibility-actions': 'error',
  'react-native-a11y/has-valid-accessibility-component-type': 'error',
  'react-native-a11y/has-valid-accessibility-descriptors': 'error',
  'react-native-a11y/has-valid-accessibility-role': 'error',
  'react-native-a11y/has-valid-accessibility-state': 'error',
  'react-native-a11y/has-valid-accessibility-states': 'error',
  'react-native-a11y/has-valid-accessibility-traits': 'error',
  'react-native-a11y/has-valid-accessibility-value': 'error',
  'react-native-a11y/no-nested-touchables': 'error',
};

const iOSRules = {
  'react-native-a11y/has-valid-accessibility-ignores-invert-colors': 'error',
};

const AndroidRules = {
  'react-native-a11y/has-valid-accessibility-live-region': 'error',
  'react-native-a11y/has-valid-important-for-accessibility': 'error',
};

module.exports = {
  rules: {
    'has-accessibility-hint': require('./rules/has-accessibility-hint'),
    'has-accessibility-props': require('./rules/has-accessibility-props'),
    'has-valid-accessibility-actions': require('./rules/has-valid-accessibility-actions'),
    'has-valid-accessibility-component-type': require('./rules/has-valid-accessibility-component-type'),
    'has-valid-accessibility-descriptors': require('./rules/has-valid-accessibility-descriptors'),
    'has-valid-accessibility-ignores-invert-colors': require('./rules/has-valid-accessibility-ignores-invert-colors'),
    'has-valid-accessibility-live-region': require('./rules/has-valid-accessibility-live-region'),
    'has-valid-accessibility-role': require('./rules/has-valid-accessibility-role'),
    'has-valid-accessibility-state': require('./rules/has-valid-accessibility-state'),
    'has-valid-accessibility-states': require('./rules/has-valid-accessibility-states'),
    'has-valid-accessibility-traits': require('./rules/has-valid-accessibility-traits'),
    'has-valid-accessibility-value': require('./rules/has-valid-accessibility-value'),
    'has-valid-important-for-accessibility': require('./rules/has-valid-important-for-accessibility'),
    'no-nested-touchables': require('./rules/no-nested-touchables'),
  },
  configs: {
    basic: {
      ...defaultConfig,
      rules: basicRules,
    },
    ios: {
      ...defaultConfig,
      rules: {
        ...basicRules,
        ...iOSRules,
      },
    },
    android: {
      ...defaultConfig,
      rules: {
        ...basicRules,
        ...AndroidRules,
      },
    },
    all: {
      ...defaultConfig,
      rules: {
        ...basicRules,
        ...iOSRules,
        ...AndroidRules,
      },
    },
  },
};
