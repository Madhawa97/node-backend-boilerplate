module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-base'],
  plugins: ['@typescript-eslint', 'prettier', 'unused-imports'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
