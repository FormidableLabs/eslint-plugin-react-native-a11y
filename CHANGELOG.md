# Changes

## V1.3.1
- Migrate to Babel v7 (to fix security issue) [(#67)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/67)

## V1.3.0

- Adds support for modern `accessibilityRole`s [(#54)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/54)
- Allow empty `accessibilityState` prop for `View` [(#48)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/48)
- Allow empty `accessibilityState` prop for `Touchable*` [(#44)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/44)
- `accessibilityRole` no longer required on Components with `accessible={false}` [(#43)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/43)
- Support for ESLint version ^6 [(#57)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/57)
- Adopted Prettier [(#51)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/51)
- Dev Dependency upgrades [(#58)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/58)


## V1.2.0

- Updated `accessibilityState` to `accessibilityStates`

## V1.1.0

- Added support for `accessibilityRole` and `accessibilityState`
- Added support for validating an array being passed by a prop.
