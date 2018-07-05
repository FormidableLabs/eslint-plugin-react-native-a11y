# accessibility-label

When an element has the accessible={true} property, it is important to set an accessibilityLabel on the element, so that people who use VoiceOver know what element they have selected. VoiceOver will read the property value when a user selects the associated element.

### References

1.  https://facebook.github.io/react-native/docs/accessibility.html

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<View accessible={true} accessibilityLabel={'Tap me!'} />
```

### Fail

```jsx
<View accessible={true} />
```
