module.exports = {
    root: true,
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        // allow async-await
        'no-tabs': 'off',
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-parsing-error': [2, {
            'x-invalid-end-tag': false
        }],
        'no-undef': 'off',
        'space-before-function-paren': ['error', 'never'],
        "indent": "off" // [1, 4]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
