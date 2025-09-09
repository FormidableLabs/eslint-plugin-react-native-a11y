import * as rules from './rules';

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

export default {
  rules: {
    'has-accessibility-hint': rules.hasAccessibilityHint,
    'has-accessibility-props': rules.hasAccessibilityProps,
    'has-valid-accessibility-actions': rules.hasValidAccessibilityActions,
    'has-valid-accessibility-component-type':
      rules.hasValidAccessibilityComponentType,
    'has-valid-accessibility-descriptors':
      rules.hasValidAccessibilityDescriptors,
    'has-valid-accessibility-ignores-invert-colors':
      rules.hasValidAccessibilityIgnoresInvertColors,
    'has-valid-accessibility-live-region':
      rules.hasValidAccessibilityLiveRegion,
    'has-valid-accessibility-role': rules.hasValidAccessibilityRole,
    'has-valid-accessibility-state': rules.hasValidAccessibilityState,
    'has-valid-accessibility-states': rules.hasValidAccessibilityStates,
    'has-valid-accessibility-traits': rules.hasValidAccessibilityTraits,
    'has-valid-accessibility-value': rules.hasValidAccessibilityValue,
    'has-valid-important-for-accessibility':
      rules.hasValidImportantForAccessibility,
    'no-nested-touchables': rules.noNestedTouchables,
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
