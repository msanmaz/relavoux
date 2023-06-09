module.exports = {
    parserOptions:{
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
    ],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      'jsx-a11y/alt-text': 'off',
      'prop-types': 'off'
    },
  };
  