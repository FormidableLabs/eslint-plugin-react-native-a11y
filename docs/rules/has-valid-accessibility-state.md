# has-valid-accessibility-state

Describes the current state of a component to the user of an assistive technology.

## `accessibilityState` is an object. It contains the following fields:

NAME|TYPE|REQUIRED
-|-|-
`disabled`|boolean|No
`selected`|boolean|No
`checked`|boolean or 'mixed'|No
`busy`|boolean|No
`expanded`|boolean|No

### References

1. [React Native Docs - accessibilityState (iOS, Android)](https://facebook.github.io/react-native/docs/accessibility#accessibilitystate-ios-android)

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity accessibilityState={{ disabled: true }} />
<TouchableOpacity accessibilityState={{ checked: true }} />
<TouchableOpacity accessibilityState={{ checked: "mixed" }} />
<TouchableOpacity accessibilityState={{ disabled: true, checked: true }} />
```

### Fail

```jsx
<TouchableOpacity accessibilityState="disabled" />
<TouchableOpacity accessibilityState={["disabled"]} />
<TouchableOpacity accessibilityState={{ disabled: "yes" }} />
<TouchableOpacity accessibilityState={{ checked: "yes" }} />
<TouchableOpacity accessibilityState={{ foo: true }} />
<TouchableOpacity accessibilityState={{ foo: "yes" }} />
```

*Note*: This plugin previously defined a rule with this name which is now `has-valid-accessibility-states` (see [#42](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/42)). React Native v0.61 introduced a new `accessibilityState` prop (see [commit](https://github.com/facebook/react-native/commit/099be9b35634851b178e990c47358c2129c0dd7d)) -- which is now covered by this rule.
