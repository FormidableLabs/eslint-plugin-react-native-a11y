# has-valid-accessibility-traits

*Note*: `accessibilityTraits` will soon be deprecated. When possible, use `accessibilityRole` and `accessibilityStates` instead of `accessibilityTraits` and `accessibilityComponentType`.

The accessibilityTraits property is used to tell a person using VoiceOver what kind of element they have selected.

## Values may be one of the following

- `"none"`
- `"button"`
- `"link"`
- `"header"`
- `"search"`
- `"image"`
- `"selected"`
- `"plays"`
- `"key"`
- `"text"`
- `"summary"`
- `"disabled"`
- `"frequentUpdates"`
- `"startsMedia"`
- `"adjustable"`
- `"allowsDirectInteraction"`
- `"pageTurn"`

### References

1. [React Native Docs - AccessibilityTraits - iOS](https://facebook.github.io/react-native/docs/accessibility.html#accessibilitytraits-ios)

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity accessibilityTraits="button" />
```

### Fail

```jsx
<TouchableOpacity accessibilityTraits="primary-button" />
```
