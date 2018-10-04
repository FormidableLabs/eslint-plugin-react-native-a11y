# has-valid-accessibility-state

*Note*: `accessibilityRole` and `accessibilityState` are meant to be a cross-platform solution to replace `accessibilityTraits` and `accessibilityComponentType`, which will soon be deprecated. When possible, use `accessibilityRole` and `accessibilityState` instead of `accessibilityTraits` and `accessibilityComponentType`.

The accessibilityState property is used to tell Talkback or Voiceover the state a UI Element is in.

## This property takes on an Array containing one or both of the following values

- `selected`: Used when the element is in a selected state. For example, a button is selected.
- `disabled`: Used when the element is disabled and cannot be interacted with.

### References

1. [React Native Docs - accessibilityState](https://facebook.github.io/react-native/docs/accessibility.html#accessibilitystate-ios-android)

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity accessibilityState="selected" />
```

### Fail

```jsx
<TouchableOpacity accessibilityState="highlighted" />
```
