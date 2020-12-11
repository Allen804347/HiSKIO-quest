module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    'standard'
  ],
  rules: {
    'no-console': ['production', 'test'].includes(process.env.NODE_ENV) ? 'error' : 'warn',
    'no-debugger': ['production', 'test'].includes(process.env.NODE_ENV) ? 'error' : 'warn',
    "vue/no-parsing-error": ["error", { "control-character-in-input-stream": false }],
    'import/no-extraneous-dependencies': 'error'
  }
}
