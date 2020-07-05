module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
     parser: 'babel-eslint',
     sourceType: "module"
 },
  env: {
    browser: true,
  },
  extends: [
    'airbnb/base',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    "no-new": 0,
    "no-return-assign": 0,
    "consistent-return": 0,
    "import/prefer-default-export": 0,
    "eqeqeq": 0,
    "class-methods-use-this": 0,
    "import/no-cycle": 0,
    "no-case-declarations": 0,
    "import/no-named-as-default-member": 0,
  },
};
