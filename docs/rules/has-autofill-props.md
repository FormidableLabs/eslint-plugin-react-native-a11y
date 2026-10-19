# has-autofill-props

A `TextInput` that hides what the user types (`secureTextEntry`) is almost always a password field. Password managers on iOS and Android only offer to fill a field when the app tells the OS what the field is for. In React Native that is the `autoComplete` prop (both platforms) or the `textContentType` prop (iOS). Without one of them the user has to leave the app, search the password manager by hand and paste, which pushes people toward short, reused passwords.

This rule reports a `secureTextEntry` element that declares neither `autoComplete` nor `textContentType`. Declaring `autoComplete="off"` or `textContentType="none"` is accepted: the rule only asks that the decision is made explicitly.

### References

  1. [React Native Docs - autoComplete](https://reactnative.dev/docs/textinput#autocomplete)
  2. [React Native Docs - textContentType (iOS)](https://reactnative.dev/docs/textinput#textcontenttype-ios)
  3. [Android Developers - Optimize your app for autofill](https://developer.android.com/identity/autofill/autofill-optimize)
  4. [WCAG 2.1 - 1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<TextInput />
<TextInput secureTextEntry autoComplete="current-password" />
<TextInput secureTextEntry autoComplete="new-password" />
<TextInput secureTextEntry textContentType="password" />
<TextInput secureTextEntry={false} />
<TextInput secureTextEntry {...props} />
```

### Fail
```jsx
<TextInput secureTextEntry />
<TextInput secureTextEntry={true} />
<TextInput secureTextEntry importantForAutofill="yes" />
```
