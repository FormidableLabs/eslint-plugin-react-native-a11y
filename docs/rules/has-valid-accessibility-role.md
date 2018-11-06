# has-valid-accessibility-role

*Note*: `accessibilityRole` and `accessibilityStates` are meant to be a cross-platform solution to replace `accessibilityTraits` and `accessibilityComponentType`, which will soon be deprecated. When possible, use `accessibilityRole` and `accessibilityStates` instead of `accessibilityTraits` and `accessibilityComponentType`.

The accessibilityRole property is used to tell Talkback or Voiceover the role of a UI Element.

## Values may be one of the following

- `adjustable`: Used when an element can be "adjusted" (e.g. a slider).
- `button`: Used when the element should be treated as a button.
- `header`: Used when an element acts as a header for a content section (e.g. the title of a navigation bar).
- `image`:  Used when the element should be treated as an image. Can be combined with button or link, for example.
- `imagebutton`: Used when the element should be treated as a button and is also an image.
- `keyboardkey`: Used when the element acts as a keyboard key.
- `link`: Used when the element should be treated as a link.
- `none`: Used when the element has no role.
- `search`: Used when the text field element should also be treated as a search field.
- `summary`: Used when an element can be used to provide a quick summary of current conditions in the app when the app first launches.
- `text`: Used when the element should be treated as static text that cannot change.

### References

1. [React Native Docs - accessibilityRole](https://facebook.github.io/react-native/docs/accessibility.html#accessibilityrole-ios-android)

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<TouchableOpacity accessibilityRole="button" />
```

### Fail

```jsx
<TouchableOpacity accessibilityRole="primary-button" />
```
