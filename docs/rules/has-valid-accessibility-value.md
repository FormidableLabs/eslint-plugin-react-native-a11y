# has-valid-accessibility-value

Represents the current value of a component.

## `accessibilityValue` is an object. It should contain either one of the following field sets:

NAME|DESCRIPTION|TYPE|REQUIRED
-|-|-|-
`min`|The minimum value of this component's range.|integer|Required if `now` is set.
`max`|The maximum value of this component's range.|integer|Required if `now` is set.
`now`|The current value of this component's range.|integer|No

NAME|DESCRIPTION|TYPE|REQUIRED
-|-|-|-
`text`|A textual description of this component's value.|string|No


### References

1. [React Native Docs - accessibilityValue (iOS, Android)](https://facebook.github.io/react-native/docs/accessibility#accessibilityvalue-ios-android)

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity accessibilityValue={{ min: 0, now: 50, max: 100 }} />
<TouchableOpacity accessibilityValue={{ text: "foo" }} />
```

### Fail

```jsx
<TouchableOpacity accessibilityValue={{ min: 0, now: 50, max: 100, text: "foo" }} />
<TouchableOpacity accessibilityValue={{ now: 50 }} />
<TouchableOpacity accessibilityValue="foo" />
<TouchableOpacity accessibilityValue={{ min: "0", now: "50", max: "100" }} />
<TouchableOpacity accessibilityValue={{ text: 0 }} />
```
