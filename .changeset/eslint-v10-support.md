---
'eslint-plugin-react-native-a11y': minor
---

Add support for ESLint v10. `peerDependencies` now allows ESLint v9 and v10, and the plugin exports flat configs (`configs.flat.basic`, `configs.flat.ios`, `configs.flat.android`, `configs.flat.all`) for use with ESLint's flat config system, which ESLint v10 requires. The legacy eslintrc-style configs (`configs.basic`, `configs.ios`, `configs.android`, `configs.all`) are unchanged for consumers still on ESLint <= 8.
