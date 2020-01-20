# has-valid-accessibility-component-type

The accessibilityComponentType property is essentially the android version of [accessibilityTraits](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/blob/master/docs/rules/has-valid-accessibility-traits.md) and is used to alert a user, using TalkBack, what kind of element they have selected.

Values may be one of the following:

- `"none"`
- `"button"`
- `"radiobutton_checked"`
- `"radiobutton_unchecked"`

### References

1. https://facebook.github.io/react-native/docs/accessibility.html#accessibilitycomponenttype-android

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity accessibilityComponentType="button" />
```

### Fail

```jsx
<TouchableOpacity accessibilityComponentType="primary-button" />
```
