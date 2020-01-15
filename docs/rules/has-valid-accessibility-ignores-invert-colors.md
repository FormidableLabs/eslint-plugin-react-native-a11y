# has-valid-accessibility-ignores-invert-colors

The `accessibilityIgnoresInvertColors` property can be used to tell iOS whether or not to invert colors on a view (including all of its subviews) when the Invert Colors accessibility feature is enabled.

This feature can be enabled on iOS via: `Settings -> General -> Accessibility -> Display Accommodations -> Invert Colors -> [Smart Invert or Classic Invert]`. Note that the Smart Invert feature will avoid inverting the colors of images and other media without need for `accessibilityIgnoresInvertColors`, but Classic Invert *will* still invert colors on media without `accessibilityIgnoresInvertColors`.

## Values may be one of the following (boolean)

- `true`: colors of everything in this view will *not* be inverted when color inversion is enabled
- `false`: the default value (unless the view is nested inside a view with `accessibilityIgnoresInvertColors={true}`). Colors in everything contained in this view may be inverted

### References

  1. [React Native accessibility documentation](http://facebook.github.io/react-native/docs/accessibility#accessibilityignoresinvertcolorsios)
  2. [accessibilityIgnoresInvertColors Apple developer docs](https://developer.apple.com/documentation/uikit/uiview/2865843-accessibilityignoresinvertcolors)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<View accessibilityIgnoresInvertColors={true}>
  <Image
    style={{width: 50, height: 50}}
    source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
  />
</View>

<View accessibilityIgnoresInvertColors></View>

<View accessibilityIgnoresInvertColors={false}></View>

<ScrollView accessibilityIgnoresInvertColors={false}></ScrollView>
```

### Fail
```jsx
<View accessibilityIgnoresInvertColors="true">
  <Image
    style={{width: 50, height: 50}}
    source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
  />
</View>

<View accessibilityIgnoresInvertColors={{value: true}}></View>

<View accessibilityIgnoresInvertColors={0}></View>
```
