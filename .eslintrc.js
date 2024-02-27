module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-unused-vars': [
      'error',
      {vars: 'all', args: 'after-used', ignoreRestSiblings: false},
    ],
    'prettier/prettier': 'error',
  },
};
