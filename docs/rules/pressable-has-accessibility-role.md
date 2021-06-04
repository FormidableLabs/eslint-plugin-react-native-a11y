# pressable-has-accessibility-role

Forbid "pressable" element without an explicit "accessibilityRole" attribute. By pressable element we mean an element that has "onPress" attribute.

### References

1. [React Native Docs - accessibilityRole](https://reactnative.dev/docs/accessibility)

## Rule Details

This rule aims to improve accessibility enforcing developers to add explicit "accessibilityRole" attribute to the pressable elements.

### Options

- "off" or 0 - turn the rule off
- "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
- "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

### Succeed

```js
<Pressable onPress={() => {}} accessibilityRole="button"></Pressable>
```

### Fail

```js
<Pressable onPress={() => {}}></Pressable>
```

## When Not To Use It

If you don't need additional accessibility for pressable elements.
