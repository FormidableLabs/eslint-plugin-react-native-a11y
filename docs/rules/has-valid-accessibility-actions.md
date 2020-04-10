# has-valid-accessibility-actions

Accessibility actions allow an assistive technology to programmatically invoke the actions of a component. In order to support accessibility actions, a component must do two things:

- Define the list of actions it supports via the `accessibilityActions` property.
- Implement an `onAccessibilityAction` function to handle action requests.

## `acccessibilityActions` is an Array containing a list of action objects.

There are two types of actions: Standard Actions, and Custom Actions.

Depending on the action type, the action should contain the following fields:-

NAME|TYPE|REQUIRED
-|-|-
`name`|string|**Yes**
`label`|string|Only required for Custom actions

### Standard Actions

Standard Actions must have a `name` field matching one of:-

NAME|PLATFORM SUPPORT
-|-
`"magicTap"`|iOS only
`"escape"`|iOS only
`"activate"`|both iOS & Android
`"increment"`|both iOS & Android
`"decrement"`|both iOS & Android
`"longpress"`|Android only

Providing a `label` for a Standard Action is optional.

```js
accessibilityActions={[
  {name:'magicTap'}
]}
```

### Custom Actions

Custom Actions can have any `name`, but must also include a `label`.

```js
accessibilityActions={[
  {name: 'cut', label: 'cut'}
]}
```

## `onAccessibilityAction` is a function.

The only argument to this function is an event containing the name of the action to perform.

e.g.
```js
<View
  accessible={true}
  accessibilityActions={[
    {name: 'cut', label: 'cut'},
    {name: 'copy', label: 'copy'},
    {name: 'paste', label: 'paste'},
  ]}
  onAccessibilityAction={(event) => {
    switch (event.nativeEvent.actionName) {
      case 'cut':
        Alert.alert('Alert', 'cut action success');
        break;
      case 'copy':
        Alert.alert('Alert', 'copy action success');
        break;
      case 'paste':
        Alert.alert('Alert', 'paste action success');
        break;
    }
  }}
/>
```

### References

1. [React Native Docs - Accessibility Actions](https://facebook.github.io/react-native/docs/accessibility#accessibility-actions)

## Rule details

This rule takes no arguments.

### Succeed

```js
<View
  accessibilityActions={[
    {name: 'cut', label: 'cut'},
    {name: 'copy', label: 'copy'},
  ]}
  onAccessibilityAction={(event) => {
    switch (event.nativeEvent.actionName) {
      case 'cut':
        Alert.alert('Alert', 'cut action success');
        break;
      case 'copy':
        Alert.alert('Alert', 'copy action success');
        break;
    }
  }}
/>
```

```js
<View
  accessibilityActions={[
    {name: 'magicTap'},
  ]}
  onAccessibilityAction={(event) => {
    switch (event.nativeEvent.actionName) {
      case 'magicTap':
        Alert.alert('Alert', 'magicTap action success');
        break;
    }
  }}
/>
```

### Fail

```js
<View
  accessibilityActions={[
    {name: 'cut', label: 'cut'},
  ]}
/>

// no onAccessibilityAction prop
```

```js
<View
  accessibilityActions={[
    {name: 'cut'},
  ]}
  onAccessibilityAction={(event) => {
    switch (event.nativeEvent.actionName) {
      case 'cut':
        Alert.alert('Alert', 'cut action success');
        break;
    }
  }}
/>

// custom action "cut" missing label
```
