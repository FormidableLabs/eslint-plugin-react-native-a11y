/**
 * @fileoverview Used to tell Talkback or Voiceover the role of a UI Element
 * @author Jen Luker
 * @flow
 */

import createValidPropRule from '../factory/valid-prop';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage =
  'accessibilityRole value is not valid.\n\nSee valid values: https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/docs/rules/has-valid-accessibility-role.md';

const validValues = [
  'adjustable',
  'alert',
  'button',
  'checkbox',
  'combobox',
  'header',
  'image',
  'imagebutton',
  'keyboardkey',
  'link',
  'menu',
  'menubar',
  'menuitem',
  'none',
  'progressbar',
  'radio',
  'radiogroup',
  'scrollbar',
  'search',
  'spinbutton',
  'summary',
  'switch',
  'tab',
  'tablist',
  'text',
  'timer',
  'toolbar',
];

module.exports = createValidPropRule(
  'accessibilityRole',
  validValues,
  errorMessage
);
