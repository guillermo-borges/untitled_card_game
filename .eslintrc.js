module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "import",
        "import-order-autofix"
    ],
    "rules": {
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "import/order": [
            "error"
        ],
        "no-console": "off",
        "react/prop-types": "off",
        "no-implicit-coercion": "error",
        "no-useless-return": "error",
        "react/display-name": "off",
        "no-unused-vars": "off",
        "no-constant-condition": "off"
    },
    "parser": "babel-eslint"
};