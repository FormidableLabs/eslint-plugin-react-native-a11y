# Changes

## V3.3.0

### ✨ New Features ✨

- Allow Eslint 8 as a peer dependency [(#145)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/145)

## V3.2.1

### 🐛 Bugfixes 🐛

- update fixer for has-valid-accessibility-descriptors [(#136)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/136)

## V3.2.0

### ✨ New Features ✨

- make has-valid-accessibility-descriptors fixable [(#131)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/131)

### 🐛 Bugfixes 🐛

- allow Identifiers in accessibilityState [(#129)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/129)
- support spread props in accessibilityState [(#132)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/132)
- allow Touchables with accessible={false} [(#130)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/130)
- assume MemberExpressions are valid [(#133)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/133)
- update has-accessibility-value to only typecheck Literals [(#134)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/134)
- update has-accessibility-role typechecking [(#135)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/135)

## V3.1.0

### ✨ New Features ✨

- Checks Touchable* components have accessibility props [(#128)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/128)

## V3.0.0

### 🚨 Breaking 🚨

- This release removes support for Node 10 [(#126)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/126)

### ✨ New Features ✨

- Allow Eslint 7 as a peer dependency [(#111)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/111)

### 🐛 Bugfixes 🐛

- only validate Literals in accessibilityState [(#112)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/112)
- allow Identifiers in accessibilityActions [(#113)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/113)

## V2.0.4
- include Pressable when checking `no-nested-touchables` [(#103](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/103)
- Dependency upgrades [(#106)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/106)

## V2.0.3
- allow CallExpressions in accessibilityActions [(#101)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/101)
- Dependency upgrades [(#102)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/102)

## V2.0.2

- Update accessibilityState to allow Identifiers for `checked` value [(#98)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/98)
- Dev Dependency upgrades [(#99)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/99)

## V2.0.1

- Allow Expressions in prop validators [(#96)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/96)
- Dependency upgrades [(#95)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/95)

## V2.0.0

- Minor doc improvements [(#78)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/78)
- Dev Dependency upgrades [(#89)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/89)

## V2.0.0-rc2

- Dev Dependency upgrades [(#88)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/88)

## V2.0.0-rc1

- Ignore `Identifier` expressions in bool typechecks [(#85)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/85)
- Enabled `no-unused-vars` [(#86)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/86)

## V2.0.0-rc0

### 🚨 Breaking 🚨

- This release removes support for Node 8 [(#80)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/80)
- The `has-valid-accessibility-state` rule has been re-written to cover the new `accessibilityState` implementation [(#60)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/60)
- Deprecates the `recommended` config and introduces new platform-specific configs [(#83)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/83)

### ✨ New Features ✨

- Adds `has-valid-accessibility-value` rule for `accessibilityValue` prop [(#68)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/68)
- Adds `has-valid-accessibility-actions` rule for `accessibilityActions` and `onAccessibilityAction` props [(#69)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/69)
- Adds `has-valid-accessibility-ignores-invert-colors` rule for `accessibilityIgnoresInvertColors` [(#73)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/73)
- Adds `has-accessibility-hint` for `accessibilityHint` [(#74)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/74)

### 🐛 Bugfixes 🐛

- Removes `Touchable~` as a requirement for custom Touchable names [(#70)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/70)
- Allows `Touchable`s without either `accessibilityRole` or both `accessibilityTraits` and `accessibilityComponentType` [(#81)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/81)
- Removes `has-accessibility-label` rule [(#82)](https://github.com/FormidableLabs/eslint-plugin-react-native-a11y/pull/82)

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
