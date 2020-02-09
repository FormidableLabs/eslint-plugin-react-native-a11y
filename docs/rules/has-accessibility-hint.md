# has-accessibility-hint

An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not apparent from the accessibility label.

### References

  1. [React Native Docs - accessibilityHint (iOS, Android)](https://facebook.github.io/react-native/docs/accessibility#accessibilityhint-ios-android)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<TouchableOpacity />
<TouchableOpacity accessibilityHint="Navigates to the previous screen" />
<TouchableOpacity accessibilityHint="Navigates to the previous screen" accessibilityLabel="Go back" />
```

### Fail
```jsx
<TouchableOpacity accessibilityLabel="Go back" />
```
