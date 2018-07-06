# has-valid-accessibility-traits

The accessibilityTraits property is used to tell a person using VoiceOver what kind of element they have selected.

Values may be one of the following:

- none
- button
- link
- header
- search
- image
- selected
- plays
- key
- text
- summary
- disabled
- frequentUpdates
- startsMedia
- adjustable
- allowsDirectInteraction
- pageTurn

### References

1.  https://facebook.github.io/react-native/docs/accessibility.html#accessibilitytraits-ios

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
