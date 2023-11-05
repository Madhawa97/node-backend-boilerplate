module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-base'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
