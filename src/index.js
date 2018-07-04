/* eslint-disable global-require */

module.exports = {
  rules: {
    'accessible-touchable': require('./rules/accessible-touchable'),
    'accessibility-label': require('./rules/accessible-touchable'),
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'jsx-a11y/accessible-touchable': 'error',
        'jsx-a11y/accessibility-label': 'error',
      },
    },
    strict: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'jsx-a11y/accessible-touchable': 'error',
        'jsx-a11y/accessibility-label': 'error',
      },
    },
  },
};
