# has-valid-tappable-area-size

Enforce that <Touchable\*> components comply with the minimum [Target Size Area specified in the WCAG](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html).

In case that porcentual values are being used to determine the height and width, even if they're higher than 44px still the linter will demand to explicitly specify the minHeight and minWidth.

Touchable components are one of:

- `TouchableOpacity`
- `TouchableHighlight`
- `TouchableWithoutFeedback`
- `TouchableNativeFeedback`
- `TouchableBounce`
- `Touchable` (from [react-native-platform-touchable](https://github.com/react-community/react-native-platform-touchable))

### References

1. [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/)
2. [Android accessibility help](https://support.google.com/accessibility/android/answer/7101858?hl=en)
3. [Target Size Area specified in the WCAG](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)


## Rule details

This rule takes no arguments.

### Succeed
```jsx
<TouchableOpacity
  style={{width: 44, height: 44}}
/>
```

```jsx
<TouchableOpacity
  style={{minWidth: 44, minHeight: 44, width: '50%', alignSelf: 'stretch'}}
/>
```
```jsx
<TouchableOpacity
  style={{minWidth: 44, minHeight: 44, flex: 1}}
/>
```

### Fail

```jsx
<TouchableOpacity />
```
```jsx
<TouchableOpacity
  style={{minWidth: 44, flex: 1}}
/>
```
```jsx
<TouchableOpacity
  style={{width: '100%', height: '100%'}}
/>
```
