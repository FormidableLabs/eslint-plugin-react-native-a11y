/* eslint-env jest */
/**
 * @fileoverview Allow an assistive technology to programmatically invoke the actions of a component.
 * @author JP Driver
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/has-valid-accessibility-actions';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run('has-valid-accessibility-actions', rule, {
  valid: [
    {
      code: `<View
              accessibilityActions={[
                {name: 'cut', label: 'cut'},
                {name: 'copy', label: 'copy'},
                {name: 'paste', label: 'paste'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                  case 'copy':
                    Alert.alert('Alert', 'copy action success');
                    break;
                  case 'paste':
                    Alert.alert('Alert', 'paste action success');
                    break;
                }
              }}
            />`,
    },
    {
      code: `<View
              accessibilityActions={[
                {name: 'magicTap'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'magicTap':
                    Alert.alert('Alert', 'magicTap action success');
                    break;
                }
              }}
            />`,
    },
    {
      code: `<View
              accessibilityActions={useMemo()}
              onAccessibilityAction={useCallback()}
            />`,
    },
    {
      code: `const onAccessibilityAction = (event) => {
                switch (event.nativeEvent.actionName) {
                  case "delete":
                    deleteAction();
                    break;
                  default:
                    Alert.alert("Some text");
                }
              }

              const accessibilityActionsList = [{ name: "delete", label: "Delete" }];

              <TouchableOpacity
                accessibilityActions={accessibilityActionsList}
                onAccessibilityAction={onAccessibilityAction}
              />`,
    },
    {
      code: `<TouchableOpacity
              accessibilityActions={this.props.accessibilityActions}
              onAccessibilityAction={this.props.onAccessibilityAction}
            />`,
    },
  ].map(parserOptionsMapper),
  invalid: [
    {
      code: `<View
              accessibilityActions={[
                {name: 'cut', label: 'cut'},
              ]}
            />`,
      errors: [
        {
          message:
            'accessibilityActions: has accessibilityActions but onAccessibilityAction is not a function',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<View
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
      errors: [
        {
          message:
            'accessibilityActions: has onAccessibilityAction function but no accessibilityActions Array',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<View
              accessibilityActions={{
                name: 'cut',
                label: 'cut',
              }}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
      errors: [
        {
          message: 'accessibilityActions: value must be an Array',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<View
              accessibilityActions={[]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
      errors: [
        {
          message: 'accessibilityActions: Array cannot be empty',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<View
              accessibilityActions={[
                {name: 'cut'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
      errors: [
        {
          message: 'accessibilityActions: custom action "cut" missing label',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<View
              accessibilityActions={[
                {label: 'cut'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
      errors: [
        {
          message: 'accessibilityActions: action missing name',
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `<View
              accessibilityActions={[
                {name: 'cut', label: 'cut', foo: 'bar'},
              ]}
              onAccessibilityAction={(event) => {
                switch (event.nativeEvent.actionName) {
                  case 'cut':
                    Alert.alert('Alert', 'cut action success');
                    break;
                }
              }}
            />`,
      errors: [
        {
          message:
            'accessibilityActions: action "cut" contains unrecognised keys',
          type: 'JSXOpeningElement',
        },
      ],
    },
  ].map(parserOptionsMapper),
});
