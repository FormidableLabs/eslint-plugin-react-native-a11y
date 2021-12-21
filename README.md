[![Maintenance Status][maintenance-image]](#maintenance-status)

# eslint-plugin-react-native-a11y

Eslint-plugin-react-native-a11y is a collection of React Native specific ESLint rules for identifying accessibility issues. Building upon the foundation set down by eslint-plugin-jsx-a11y, eslint-plugin-react-native-a11y detects a few of the most commonly made accessibility issues found in react native apps. These rules make it easier for your apps to be navigable by users with screen readers.

## Setup

### Pre-Requisites
Before starting, check you already have ESLint as a `devDependency` of your project.

> Projects created using `react-native init` will already have this, but for Expo depending on your template you may need to follow ESLint's [installation instructions](https://eslint.org/docs/user-guide/getting-started#installation-and-usage).

### Installation

Next, install `eslint-plugin-react-native-a11y`:

```sh
npm install eslint-plugin-react-native-a11y --save-dev

# or

yarn add eslint-plugin-react-native-a11y --dev
```

**Note:** If you installed ESLint globally (using the `-g` flag in npm, or the `global` prefix in yarn) then you must also install `eslint-plugin-react-native-a11y` globally.

## Configuration

This plugin exposes four recommended configs.

Name|Description
-|-
basic|Only use basic validation rules common to both iOS & Android
ios|Use all rules from "basic", plus iOS-specific extras
android|Use all rules from "basic", plus Android-specific extras
all|Use all rules from "basic", plus iOS-specific extras, plus Android-specific extras

If your project only supports a single platform, you may get the best experience using a platform-specific config. This will both avoid reporting issues which do not affect your platform and also results in slightly faster linting for larger projects.

> If you are unsure which one to use, in most cases `all` can be safely used.

Add the config you want to use to the `extends` section of your ESLint config using the pattern `plugin:react-native-a11y/` followed by your config name, as shown below:

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react-native-a11y/ios'
  ]
};
```

Alternatively if you do not want to use one of the pre-defined configs — or want to override the behaviour of a specific rule — you can always include a list rules and configurations in the `rules` section of your ESLint config.

```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: [
    '@react-native-community',
  ],
  rules: {
    'react-native-a11y/rule-name': 2
  }
};
```

For more information on configuring behaviour of an individual rule, please refer to the [ESLint docs](react-native-a11y/rule-name)

## Supported Rules

### Basic
- [has-accessibility-hint](docs/rules/has-accessibility-hint.md): Enforce `accessibilityHint` is used in conjunction with `accessibilityLabel`
- [has-accessibility-props](docs/rules/has-accessibility-props.md): Enforce that `<Touchable\*>` components only have either the `accessibilityRole` prop or both `accessibilityTraits` and `accessibilityComponentType` props set
- [has-valid-accessibility-actions](docs/rules/has-valid-accessibility-actions.md): Enforce both `accessibilityActions` and `onAccessibilityAction` props are valid
- [has-valid-accessibility-role](docs/rules/has-valid-accessibility-role.md): Enforce `accessibilityRole` property value is valid
- [has-valid-accessibility-state](docs/rules/has-valid-accessibility-state.md): Enforce `accessibilityState` property value is valid
- [has-valid-accessibility-states](docs/rules/has-valid-accessibility-states.md): Enforce `accessibilityStates` property value is valid
- [has-valid-accessibility-component-type](docs/rules/has-valid-accessibility-component-type.md): Enforce `accessibilityComponentType` property value is valid
- [has-valid-accessibility-traits](docs/rules/has-valid-accessibility-traits.md): Enforce `accessibilityTraits` and `accessibilityComponentType` prop values must be valid
- [has-valid-accessibility-value](docs/rules/has-valid-accessibility-value.md): Enforce `accessibilityValue` property value is valid
- [no-nested-touchables](docs/rules/no-nested-touchables.md): Enforce if a view has `accessible={true}`, that there are no touchable elements inside
- [has-valid-accessibility-descriptors](docs/rules/has-valid-accessibility-descriptors.md): Ensures that Touchable* components have appropriate props to communicate with assistive technologies

### iOS
- [has-valid-accessibility-ignores-invert-colors](docs/rules/has-valid-accessibility-ignores-invert-colors.md): Enforce that certain elements use `accessibilityIgnoresInvertColors` to avoid being inverted by device color settings.

### Android
- [has-valid-accessibility-live-region](docs/rules/has-valid-accessibility-live-region.md): Enforce `accessibilityLiveRegion` prop values must be valid
- [has-valid-important-for-accessibility](docs/rules/has-valid-important-for-accessibility.md): Enforce `importantForAccessibility` property value is valid

### Rule Options

The following options are available to customize the recommended rule set.

#### Custom Touchables

`react-native-a11y/has-accessibility-props` and `react-native-a11y/no-nested-touchables` allow you to define an array of names for custom components that you may have that conform to the same accessibility interfaces as Touchables.

```js
"react-native-a11y/has-accessibility-props": [
  "error",
  {
    "touchables": ["TouchableCustom"]
  }
]
```

#### Custom Invertable Components (iOS)

`react-native-a11y/has-valid-accessibility-ignores-invert-colors` allows you to optionally define an Array of component names to check in addition to `<Image />`.

For more information, see the [rule docs](docs/has-valid-accessibility-ignores-invert-colors.md#rule-details).

```js
"react-native-a11y/has-valid-accessibility-ignores-invert-colors": [
  "error",
  {
    "invertableComponents": [
      "FastImage",
    ]
  }
]
```

## Creating a new rule

If you are developing new rules for this project, you can use the `create-rule`
script to scaffold the new files.

```
$ ./scripts/create-rule.js my-new-rule
```

## Attribution

This project started as a fork of [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) and a lot of the work was carried out by its [contributors](https://github.com/evcohen/eslint-plugin-jsx-a11y/graphs/contributors), to whom we owe a lot!

## License

eslint-plugin-react-native-a11y is licensed under the [MIT License](LICENSE.md).

### Maintenance Status

**Active:** Formidable is actively working on this project, and we expect to continue for work for the foreseeable future. Bug reports, feature requests and pull requests are welcome.

[maintenance-image]: https://img.shields.io/badge/maintenance-active-green.svg
