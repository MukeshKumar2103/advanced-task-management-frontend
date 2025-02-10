import { FlatCompat } from '@eslint/eslintrc';

import { dirname } from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'prefer-template': ['error'],
      'jsx-quotes': ['error', 'prefer-single'],
    },
  }),
];

export default eslintConfig;
