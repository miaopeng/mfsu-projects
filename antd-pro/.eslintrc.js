module.exports = {
  root: true,
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    project: 'antd-pro/tsconfig.json',
    sourceType: 'module',
    createDefaultProgram: true,
  },
  globals: {
    REACT_APP_ENV: true,
  },
  rules: {
    camelcase: 1,
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
