# has-valid-important-for-accessibility

If there are two (or more) overlapping UI components with the same parent, default accessibility focus can have unpredictable behavior. The `importantForAccessibility` property will resolve this by controlling if a view fires accessibility events and if it is reported to accessibility services. It can be set to:

- `"auto"`
- `"yes"`
- `"no"`
- `"no-hide-descendants"` (this will force accessibility services to ignore the component and all of its children).

### References

1. https://facebook.github.io/react-native/docs/accessibility.html#importantforaccessibility-android

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<View>
  <View importantForAccessibility="yes">
    <Text> First layout </Text>
  </View>
  <View importantForAccessibility="no-hide-descendants">
    <Text> Second layout </Text>
  </View>
</View>
```

In this example, the second child `View` and its descendants are completely invisible to TalkBack and all other accessibility services. So we can easily use overlapping views with the same parent without confusing TalkBack.

### Fail

```jsx
<View>
  <View importantForAccessibility="no">
    <Text> First layout </Text>
  </View>
  <View importantForAccessibility="very">
    <Text> Second layout </Text>
  </View>
</View>
```
