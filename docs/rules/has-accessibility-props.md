# has-accessibility-props

Enforce that <Touchable\*> components only have either the accessibilityRole prop or both accessibilityTraits and accessibilityComponentType props set.

The accessibilityRole props tells VoiceOver on iOS what kind of element the user has selected.

Touchable components are one of:

- `TouchableOpacity`
- `TouchableHighlight`
- `TouchableWithoutFeedback`
- `TouchableNativeFeedback`
- `TouchableBounce`
- `Touchable` (from [react-native-platform-touchable](https://github.com/react-community/react-native-platform-touchable))

### References

1. https://facebook.github.io/react-native/docs/accessibility.html#accessibilityrole-ios-android
2. https://facebook.github.io/react-native/docs/accessibility.html#accessibilitytraits-ios
3. https://facebook.github.io/react-native/docs/accessibility.html#accessibilitycomponenttype-android

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity
  accessibilityRole="none"
/>
```

```jsx
<TouchableOpacity
  accessibilityTraits="none"
  accessibilityComponentType="none"
/>
```

```jsx
<TouchableOpacity
  accessible={false}
/>
```

```jsx
<TouchableOpacity />
```

### Fail

```jsx
<TouchableOpacity accessibilityComponentType="none" />
```

```jsx
<TouchableOpacity
  accessibilityTraits="none"
/>
```

```jsx
<TouchableOpacity accessibilityRole="none" accessibilityComponentType="none" />
```

```jsx
<TouchableOpacity accessibilityRole="none" accessibilityTraits="none" />
```

```jsx
<TouchableOpacity accessibilityRole="none" accessibilityComponentType="none" accessibilityTraits="none" />
```
