module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        node: true,
        jest: true,
        browser: true,
        mongo: true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                node: true,
                jest: true,
                browser: true,
                mongo: true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
};
