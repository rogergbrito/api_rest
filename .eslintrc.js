module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "no-console": "off",  // desativa a problema de não poder usar o console.log
    "class-methods-use-this": "off",
    "import/first": "off",  // desativa a opção de chamar os imports sempre primeiro
    "no-param-reassign": "off",
    "max-len": "off",
    "camelcase": "off"
  },
};
