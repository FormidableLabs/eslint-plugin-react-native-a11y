# has-valid-accessibility-live-region

On android devices, when components dynamically change, we want TalkBack to alert the end user. This is made possible by the `accessibilityLiveRegion` property. It can be set to the following values:

- `"none"`: Accessibility services should not announce changes to this view.
- `"polite"`: Accessibility services should announce changes to this view.
- `"assertive"`: Accessibility services should interrupt ongoing speech to immediately announce changes to this view.

### References

1. https://facebook.github.io/react-native/docs/accessibility.html#accessibilityliveregion-android

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<Text accessibilityLiveRegion="polite">Click Me</Text>
```

### Fail

```jsx
<Text accessibilityLiveRegion="rude">Click Me</Text>
```
