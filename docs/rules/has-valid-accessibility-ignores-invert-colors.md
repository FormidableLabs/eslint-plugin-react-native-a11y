# has-valid-accessibility-ignores-invert-colors

The `accessibilityIgnoresInvertColors` property can be used to tell iOS whether or not to invert colors on a view (including all of its subviews) when the Invert Colors accessibility feature is enabled.

This feature can be enabled on iOS via: `Settings -> General -> Accessibility -> Display Accommodations -> Invert Colors -> [Smart Invert or Classic Invert]`. Note that the Smart Invert feature will avoid inverting the colors of images and other media without need for `accessibilityIgnoresInvertColors`, but Classic Invert *will* still invert colors on media without `accessibilityIgnoresInvertColors`.

`accessibilityIgnoresInvertColors` is usually used on elements like `<Image />` -- however in some cases it may be used on a parent wrapper.

For example, both of the following snippets are valid (and will achieve the same result in practice).

```js
<View>
  <Image accessibilityIgnoresInvertColors={true} />
</View>
```

```js
<View accessibilityIgnoresInvertColors={true}>
  <Image />
</View>
```

## Values may be one of the following (boolean)

- `true`: colors of everything in this view will *not* be inverted when color inversion is enabled
- `false`: the default value (unless the view is nested inside a view with `accessibilityIgnoresInvertColors={true}`). Colors in everything contained in this view may be inverted

### References

  1. [React Native accessibility documentation](http://facebook.github.io/react-native/docs/accessibility#accessibilityignoresinvertcolorsios)
  2. [accessibilityIgnoresInvertColors Apple developer docs](https://developer.apple.com/documentation/uikit/uiview/2865843-accessibilityignoresinvertcolors)

## Rule details

By default, the rule will only check `<Image />`.

If you would like to check additional components which might require `accessibilityIgnoresInvertColors`, you can pass an options object which contains `invertableComponents` in your ESLint config.

`invertableComponents` should be an Array of component names as strings.

```js
"react-native-a11y/has-valid-accessibility-ignores-invert-colors": [
  "error",
  {
    "invertableComponents": [
      "FastImage",
      "MyCustomComponent",
      ...
    ]
  }
]
```

```js
{/* invalid, rule will error */}
<FastImage />

<View>
  <FastImage />
</View>

{/* valid */}
<FastImage accessibilityIgnoresInvertColors />

<View accessibilityIgnoresInvertColors>
  <FastImage />
</View>
```

These extra `invertableComponents` will also be checked in addition to `<Image />`.

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
