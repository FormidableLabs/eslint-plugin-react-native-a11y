/* eslint-disable global-require */

module.exports = {
  rules: {
    'accessible-emoji': require('./rules/accessible-emoji'),
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
        'jsx-a11y/accessible-emoji': 'error',
        'jsx-a11y/accessible-touchable': 'error',
      },
    },
    strict: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'jsx-a11y/accessible-emoji': 'error',
      },
    },
  },
};
