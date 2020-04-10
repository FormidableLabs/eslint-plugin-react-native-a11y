# has-valid-accessibility-states

*Note*: `accessibilityRole` and `accessibilityStates` are meant to be a cross-platform solution to replace `accessibilityTraits` and `accessibilityComponentType`, which will soon be deprecated. When possible, use `accessibilityRole` and `accessibilityStates` instead of `accessibilityTraits` and `accessibilityComponentType`.

The accessibilityStates property is used to tell Talkback or Voiceover the state a UI Element is in.

## This property takes on an Array containing one, both, or neither of the following values

- `"selected"`: Used when the element is in a selected state. For example, a button is selected.
- `"disabled"`: Used when the element is disabled and cannot be interacted with

### References

1. [React Native Docs - accessibilityStates](https://facebook.github.io/react-native/docs/accessibility.html#accessibilityStates-ios-android)

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity accessibilityStates={["selected"]} />
<TouchableOpacity accessibilityStates={["disabled"]} />
<TouchableOpacity accessibilityStates={["selected", "disabled"]} />
<TouchableOpacity accessibilityStates={[]} />
<TouchableOpacity accessibilityStates={[""]} />
```

### Fail

```jsx
<TouchableOpacity accessibilityStates="highlighted" />
```
