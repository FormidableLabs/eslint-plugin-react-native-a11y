# eslint-plugin-react-native-a11y

Warns about React Native specific accessibility issues with your React elements.

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

- [accessibility-label](docs/rules/accessibility-label.md): Enforce that views that have `accessible={true}`, also have an accessibilityLabel prop
- [has-accessibility-props](docs/rules/has-accessibility-props.md): Enforce all `<Touchable\*>` components have `accessibilityTraits` and `accessibilityComponentType` props set
- [has-valid-accessibility-traits](docs/rules/has-valid-accessibility-traits.md): Enforce `accessibilityTraits` and `accessibilityComponentType` prop values must be valid
- [no-nested-touchables](docs/rules/no-nested-touchables.md): Enforce if a view has `accessible={true}`, that there are no touchable elements inside

## Creating a new rule

If you are developing new rules for this project, you can use the `create-rule`
script to scaffold the new files.

```
$ ./scripts/create-rule.js my-new-rule
```

## Attribution

This project started as a fork of [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) and a lot of the work was carried out by its [contributors](evcohen/eslint-plugin-jsx-a11y/graphs/contributors), to whom we owe a lot!

## License

eslint-plugin-react-native-a11y is licensed under the [MIT License](LICENSE.md).
