/**
 * @fileoverview Enforce that views that have accessible={true}, also have an accessibilityLabel prop
 * @author Alex Saunders
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp } from 'jsx-ast-utils';
import getLiteralPropValue from 'jsx-ast-utils/lib/getPropValue';
import type { JSXOpeningElement } from 'ast-types-flow';
import type { ESLintContext } from '../../flow/eslint';
import { generateObjSchema } from '../util/schemas';
import findChild from '../util/findChild';

const errorMessage =
	'If an element adopts the accessible={true} prop, it (or at least one of its children) must also set the accessibilityLabel prop';

const schema = generateObjSchema();

function getAccessibilityLabel(node) {
	const labelProp = getProp(node.attributes, 'accessibilityLabel');
	if (labelProp && labelProp.value) {
		return getLiteralPropValue(labelProp);
	}
	return null;
}

module.exports = {
	meta: {
		docs: {},
		schema: [schema]
	},

	create: (context: ESLintContext) => ({
		JSXOpeningElement: (node: JSXOpeningElement) => {
			const accessible = getProp(node.attributes, 'accessible');
			if (!accessible || (accessible.value && accessible.value.expression.value === false)) return;
			const labelPropVal = getAccessibilityLabel(node);
			if (!labelPropVal) {
				let childWithLabel;
				// $FlowFixMe
				if (node.parent) {
					// $FlowFixMe
					childWithLabel = findChild(node.parent, child => {
						if (child.attributes) {
							const childLabelValue = getAccessibilityLabel(child);
							return !!childLabelValue;
						}
						return false;
					});
				}
				if (!childWithLabel) {
					context.report({
						node,
						message: errorMessage
					});
				}
			}
		}
	})
};
