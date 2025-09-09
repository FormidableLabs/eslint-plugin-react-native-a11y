import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import globals from 'globals';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node
    }
  }
);
