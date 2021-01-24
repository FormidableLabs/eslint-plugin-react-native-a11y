# no-nested-touchables

<Touchable*> and <Pressable /> or <Button /> will not work inside an accessible element. Any element that has the accessible={true} property (along with the accessibleLabel property) must therefore not contain any <Touchable*> and <Pressable /> or <Button /> elements.

### References

1. https://facebook.github.io/react-native/docs/accessibility.html

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
>
  <Text>submit</Text>
  <View>
    <Text>cancel</Text>
  </View>
</TouchableOpacity>
```

### Fail

```jsx
<TouchableOpacity
  accessibilityTraits="button"
  accessibilityComponentType="button"
  accessibilityLabel="Tap Me!"
  accessible={true}
>
  <View>
    <Button />
  </View>
</TouchableOpacity>
```
