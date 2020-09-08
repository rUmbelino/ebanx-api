module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    camelcase: 0,
    'linebreak-style': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
  },
};
