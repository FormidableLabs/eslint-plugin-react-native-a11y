# accessible-touchable

<Touchable\*> components must have both the accessibilityTraits and accessibilityComponentType props in order to be fully accessibile.

The accessibilityTraits props tells VoiceOver on iOS what kind of element the user has selected. For android, the accessibilityComponentType prop serves a similar purpose, alerting the end user of the type of selected component.

(Touchable components are one of: TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback or TouchableNativeFeedback)

### References

1.  https://facebook.github.io/react-native/docs/accessibility.html#accessibilitytraits-ios
2.  https://facebook.github.io/react-native/docs/accessibility.html#accessibilitycomponenttype-android

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity
  accessibilityTraits="none"
  accessibilityComponentType="none"
/>
```

### Fail

```jsx
<TouchableOpacity accessibilityComponentType="none" />
```
