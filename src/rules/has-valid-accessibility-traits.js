/**
 * @fileoverview Enforce accessibilityTraits property value is valid
 * @author Alex Saunders
 * @flow
 */

import createValidPropRule from '../factory/valid-prop';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const errorMessage = 'accessibilityTraits must be one of defined values';

const validValues = [
  'none',
  'button',
  'link',
  'header',
  'search',
  'image',
  'selected',
  'plays',
  'key',
  'text',
  'summary',
  'disabled',
  'frequentUpdates',
  'startsMedia',
  'adjustable',
  'allowsDirectInteraction',
  'pageTurn',
];

module.exports = createValidPropRule(
  'accessibilityTraits',
  validValues,
  errorMessage
);
