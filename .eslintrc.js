module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jest": true,
        "embertest": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "classes": true,
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "object-shorthand": ["error", "always"],
        "array-callback-return": "error",
        "no-loop-func": "error",
        "no-new-func": "error",
        "no-param-reassign": "error",
        "prefer-arrow-callback": "error",
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "prefer-spread": "error",
        "prefer-rest-params": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ]
    },
};
