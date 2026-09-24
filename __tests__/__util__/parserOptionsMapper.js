const defaultParserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

export default function parserOptionsMapper({
  code,
  errors,
  options = [],
  output,
  parserOptions = {},
}) {
  const { ecmaVersion, sourceType, ...restParserOptions } = {
    ...defaultParserOptions,
    ...parserOptions,
  };

  return {
    code,
    errors,
    options,
    ...(output !== undefined ? { output } : {}),
    languageOptions: {
      ecmaVersion,
      ...(sourceType !== undefined ? { sourceType } : {}),
      parserOptions: restParserOptions,
    },
  };
}
