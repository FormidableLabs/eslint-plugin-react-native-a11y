/**
 * @fileoverview Enforce `accessibilityLiveRegion` property value is valid

 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import createValidPropRule from '../factory/valid-prop';

const errorMessage = 'accessibilityLiveRegion must be one of defined values';

const validValues = ['none', 'polite', 'assertive'];

module.exports = createValidPropRule(
  'accessibilityLiveRegion',
  validValues,
  errorMessage
);
