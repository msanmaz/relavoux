module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    }
  },
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
        'plugin:@next/next/recommended',
        "plugin:@typescript-eslint/recommended",

    ],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      'jsx-a11y/alt-text': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      'inner declarations': 'off',
      'no-empty-pattern':'off',
      'no-unexpected-multiline':'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  };
  