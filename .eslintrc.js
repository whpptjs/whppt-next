module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  env: {
    browser: true,
  },
};
