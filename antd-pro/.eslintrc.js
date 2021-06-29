module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    REACT_APP_ENV: true,
  },
  rules: {
    camelcase: 0,
    'global-require': 0,
    'no-bitwise': ['error', { allow: ['~'] }],
    'no-console': 0,
    'no-restricted-globals': 0,
    'no-underscore-dangle': 0,
    'linebreak-style': 0,
    'no-plusplus': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default-member': 0,
  },
};
