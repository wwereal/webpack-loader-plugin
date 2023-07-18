module.exports = {
  env: {
    node: true,
    es2021: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: 'eslint:recommended',
  rules: {
    'quotes': [2, 'single'],
    'no-cond-assign': 0
  },
  ignorePatterns: ['dist'],
  globals: { 
    localStorage: true,
    window : true,
    document: true
  }
};
