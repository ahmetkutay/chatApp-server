module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        browser: true,
        jest: true,
    },
    extends: 'eslint:recommended',
    overrides: [
        {
            files: ['.eslintrc.{js,cjs}', '.eslintignore', 'src/**/*.js'],
            parserOptions: {
                sourceType: 'script',
                ecmaVersion: 12,
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'linebreak-style': ['error', ['unix','windows']],
        semi: ['error', 'always'],
        indent: ['error', 4],
        quotes: ['error', 'single'],
        camelcase: ['error'],
        'no-unused-vars': ['error'],
    },
};