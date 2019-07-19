/**
 * @fileoverview Enforce importantForAccessibility property value is valid
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import createValidPropRule from '../factory/valid-prop';

const errorMessage = 'importantForAccessibility must be one of defined values';

const validValues = ['auto', 'yes', 'no', 'no-hide-descendants'];

module.exports = createValidPropRule(
  'importantForAccessibility',
  validValues,
  errorMessage
);
