module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:jest/recommended"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "semi": ["error", "always"],
        "semi-style": ["error", "last"],
        "quotes": ["error", "single"]
    }
};