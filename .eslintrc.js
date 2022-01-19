module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'no-console': 2,
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }]
  }
};
