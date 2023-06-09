module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      'jsx-a11y/alt-text': 'off',
    },
  };
  