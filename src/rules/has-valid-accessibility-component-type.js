/**
 * @fileoverview Enforce accessibilityComponentType property value is valid
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import createValidPropRule from '../factory/valid-prop';

const errorMessage = 'accessibilityComponentType must be one of defined values';

const validValues = [
  'none',
  'button',
  'radiobutton_checked',
  'radiobutton_unchecked',
];

module.exports = createValidPropRule(
  'accessibilityComponentType',
  validValues,
  errorMessage
);
