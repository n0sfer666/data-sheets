module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-undef': ['off'],
    'no-unused-vars': ['off'],
    'react/jsx-filename-extension': ['off'],
    'import/extensions': ['off'],
    'import/no-unresolved': ['off'],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'no-param-reassign': ['error', { props: false }],
  },
};
