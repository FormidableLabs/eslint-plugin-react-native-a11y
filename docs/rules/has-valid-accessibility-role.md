# has-valid-accessibility-role

*Note*: `accessibilityRole` and `accessibilityStates` are meant to be a cross-platform solution to replace `accessibilityTraits` and `accessibilityComponentType`, which will soon be deprecated. When possible, use `accessibilityRole` and `accessibilityStates` instead of `accessibilityTraits` and `accessibilityComponentType`.

The accessibilityRole property is used to tell Talkback or Voiceover the role of a UI Element.

## Values may be one of the following

- `"adjustable"`:  Used when an element can be "adjusted" (e.g. a slider).
- `"alert"`:  Used when an element contains important text to be presented to the user.
- `"button"`:  Used when the element should be treated as a button.
- `"checkbox"`:  Used when an element represents a checkbox which can be checked, unchecked, or have mixed checked state.
- `"combobox"`:  Used when an element represents a combo box, which allows the user to select among several choices.
- `"header"`:  Used when an element acts as a header for a content section (e.g. the title of a navigation bar).
- `"image"`:  Used when the element should be treated as an image. Can be combined with button or link, for example.
- `"imagebutton"`:  Used when the element should be treated as a button and is also an image.
- `"keyboardkey"`:  Used when the element acts as a keyboard key.
- `"link"`:  Used when the element should be treated as a link.
- `"menu"`:  Used when the component is a menu of choices.
- `"menubar"`:  Used when a component is a container of multiple menus.
- `"menuitem"`:  Used to represent an item within a menu.
- `"none"`:  Used when the element has no role.
- `"progressbar"`:  Used to represent a component which indicates progress of a task.
- `"radio"`:  Used to represent a radio button.
- `"radiogroup"`:  Used to represent a group of radio buttons.
- `"scrollbar"`:  Used to represent a scroll bar.
- `"search"`:  Used when the text field element should also be treated as a search field.
- `"spinbutton"`:  Used to represent a button which opens a list of choices.
- `"summary"`:  Used when an element can be used to provide a quick summary of current conditions in the app when the app first launches.
- `"switch"`:  Used to represent a switch which can be turned on and off.
- `"tab"`:  Used to represent a tab.
- `"tablist"`:  Used to represent a list of tabs.
- `"text"`:  Used when the element should be treated as static text that cannot change.
- `"timer"`:  Used to represent a timer.
- `"toolbar"`:  Used to represent a tool bar (a container of action buttons or components).

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
