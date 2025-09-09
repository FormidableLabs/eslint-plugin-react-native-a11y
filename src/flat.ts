import * as rules from './rules';
import pkg from '../package.json';

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

const plugin = {
  rules,
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  configs: {
    basic: { ...defaultConfig, rules: basicRules },
    ios: { ...defaultConfig, rules: { ...basicRules, ...iOSRules } },
    android: { ...defaultConfig, rules: { ...basicRules, ...AndroidRules } },
    all: {
      ...defaultConfig,
      rules: { ...basicRules, ...iOSRules, ...AndroidRules },
    },
  },
};

export default plugin;
