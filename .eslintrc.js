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
        "arrow-parens": ["error", "as-needed"],
        "object-shorthand": ["error", "always"],
        "quote-props": ["error", "as-needed"],
        "array-callback-return": "error",
        "no-useless-constructor": "error",
        "no-new-object": "error",
        "no-array-constructor": "error",
        "no-loop-func": "error",
        "no-new-func": "error",
        "no-param-reassign": "error",
        "no-confusing-arrow": "error",
        "no-loop-func": "error",
        "no-useless-escape": "error",
        "no-dupe-class-members": "error",
        "no-duplicate-imports": "error",
        "no-iterator": "error",
        "no-restricted-syntax": ["error", "WithStatement"],
        "prefer-const": "error",
        "prefer-arrow-callback": "error",
        "prefer-spread": "error",
        "prefer-rest-params": "error",
        "prefer-template": "error",
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "space-before-function-paren": ["error", "always"],
        "space-before-blocks": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "quotes": ["error", "single"],
        "func-style": ["error", "expression"],
        "one-var": ["error", "never"],
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
