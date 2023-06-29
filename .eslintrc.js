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
    'quotes': [2, 'single']
  },
  globals: { 
    localStorage: true,
    window : true,
    document: true
  }
};
