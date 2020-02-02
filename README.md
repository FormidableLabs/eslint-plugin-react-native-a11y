[![Maintenance Status][maintenance-image]](#maintenance-status)

# eslint-plugin-react-native-a11y

Eslint-plugin-react-native-a11y is a collection of React Native specific ESLint rules for identifying accessibility issues. Building upon the foundation set down by eslint-plugin-jsx-a11y, eslint-plugin-react-native-a11y detects a few of the most commonly made accessibility issues found in react native apps. These rules make it easier for your apps to be navigable by users with screen readers.

## Installation

Install [ESLint](http://eslint.org):

```sh
# npm
npm install eslint --save-dev

# yarn
yarn add eslint --dev
```

Next, install `eslint-plugin-react-native-a11y`:

```sh
# npm
npm install eslint-plugin-react-native-a11y --save-dev

# yarn
yarn add eslint-plugin-react-native-a11y --dev
```

**Note:** If you installed ESLint globally (using the `-g` flag in npm, or the `global` prefix in yarn) then you must also install `eslint-plugin-react-native-a11y` globally.

## Usage

Add `react-native-a11y` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": ["react-native-a11y"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "react-native-a11y/rule-name": 2
  }
}
```

Alternatively, you can enable all the recommended rules at once by adding `plugin:react-native-a11y/recommended` to the `extends` section of your `.eslintrc` configuration file:

```js
{
  "extends": [
    "plugin:react-native-a11y/recommended"
  ]
}
```

## Supported Rules

- [accessibility-label](docs/rules/accessibility-label.md): Enforce that views that have `accessible={true}`, also have an `accessibilityLabel` prop
- [has-accessibility-props](docs/rules/has-accessibility-props.md): Enforce that `<Touchable\*>` components only have either the `accessibilityRole` prop or both `accessibilityTraits` and `accessibilityComponentType` props set
- [has-valid-accessibility-role](docs/rules/has-valid-accessibility-role.md): Enforce `accessibilityRole` property value is valid
- [has-valid-accessibility-states](docs/rules/has-valid-accessibility-states.md): Enforce `accessibilityStates` property value is valid
- [has-valid-accessibility-component-type](docs/rules/has-valid-accessibility-component-type.md): Enforce `accessibilityComponentType` property value is valid
- [has-valid-accessibility-traits](docs/rules/has-valid-accessibility-traits.md): Enforce `accessibilityTraits` and `accessibilityComponentType` prop values must be valid
- [has-valid-accessibility-live-region](docs/rules/has-valid-accessibility-live-region.md): Enforce `accessibilityLiveRegion` prop values must be valid
- [has-valid-important-for-accessibility](docs/rules/has-valid-important-for-accessibility.md): Enforce `importantForAccessibility` property value is valid
- [no-nested-touchables](docs/rules/no-nested-touchables.md): Enforce if a view has `accessible={true}`, that there are no touchable elements inside

### Rule Options

The following options are available to customize the recommended rule set.

#### Custom Touchables

`react-native-a11y/has-accessibility-props` and `react-native-a11y/no-nested-touchables` allow you to define an array of names for custom components that you may have that conform to the same accessibility interfaces as Touchables. Each of these names must start with 'Touchable'.

```js
"react-native-a11y/has-accessibility-props": [
  "error",
  {
    "touchables": ["TouchableCustom"]
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

