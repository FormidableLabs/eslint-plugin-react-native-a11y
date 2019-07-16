/**
 * @fileoverview Used to tell Talkback or Voiceover the role of a UI Element
 * @author Jen Luker
 * @flow
 */

import createValidPropRule from "../factory/valid-prop";

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = "accessibilityRole must be one of defined values";

const validValues = [
  "adjustable",
  "button",
  "header",
  "image",
  "imagebutton",
  "keyboardkey",
  "link",
  "none",
  "search",
  "summary",
  "text"
];

module.exports = createValidPropRule(
  "accessibilityRole",
  validValues,
  errorMessage
);
