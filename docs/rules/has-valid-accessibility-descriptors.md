# has-valid-accessibility-descriptors

Ensures that Touchable* components have appropriate props to communicate with assistive technologies.

The rule will trigger when a Touchable* component does not have **any** of the following props:-

- `accessibiltyRole`
- `accessibilityLabel`
- `accessibilityActions`

In some cases, fixing this may then trigger other rules for related props (e.g. if you add `accessibilityActions` to fix this but are missing `onAccessibilityAction`)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<Pressable accessibilityRole="button">
  <Text>Back</Text>
</Pressable>
```

### Fail
```jsx
<Pressable>
  <Text>Back</Text>
</Pressable>
```
