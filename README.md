# eslint-plugin-react-native-a11y

React Native specific accessibility linting rules.

## Why?

TODO

<!-- Ryan Florence built out this awesome runtime-analysis tool called [react-a11y](https://github.com/reactjs/react-a11y). It is super useful. However, since you're probably already using linting in your project, this plugin comes for free and closer to the actual development process. Pairing this plugin with an editor lint plugin, you can bake accessibility standards into your application in real-time.

**Note**: This project does not _replace_ react-a11y, but can and should be used in conjunction with it. Static analysis tools cannot determine values of variables that are being placed in props before runtime, so linting will not fail if that value is undefined and/or does not pass the lint rule. -->

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

Alternatively, you can enable all the recommended or strict rules at once.
Add `plugin:react-native-a11y/recommended` or `plugin:react-native-a11y/strict` to the `extends` section of your `.eslintrc` configuration file:

```json
{
  "extends": [
    "plugin:react-native-a11y/recommended"
    // or: "plugin:react-native-a11y/strict"
  ]
}
```

## Supported Rules

### Difference between 'recommended' and 'strict' mode

No differences yet

## Creating a new rule

If you are developing new rules for this project, you can use the `create-rule`
script to scaffold the new files.

```
$ ./scripts/create-rule.js my-new-rule
```

## License

eslint-plugin-react-native-a11y is licensed under the [MIT License](LICENSE.md).
