const prettierConfig = require("./.prettierrc.js");

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "next/core-web-vitals",
        "plugin:jest-dom/recommended",
        'plugin:testing-library/react'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react","simple-import-sort"],
    rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        // Possible errors
        "no-console": "warn",
        // Best practices
        "dot-notation": "error",
        "no-else-return": "error",
        "no-floating-decimal": "error",
        "no-sequences": "error",
        // Stylistic
        "array-bracket-spacing": "error",
        "computed-property-spacing": ["error", "never"],
        curly: "error",
        "no-lonely-if": "error",
        "no-unneeded-ternary": "error",
        "one-var-declaration-per-line": "error",
        quotes: [
            "error",
            "single",
            {
                allowTemplateLiterals: false,
                avoidEscape: true,
            },
        ],
        // ES6
        "array-callback-return": "off",
        "prefer-const": "error",
        // Imports
        "import/prefer-default-export": "off",
        "sort-imports": [
            "error",
            {
                ignoreCase: true,
                ignoreDeclarationSort: true,
            },
        ],
        "no-unused-expressions": "off",
        "no-prototype-builtins": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/href-no-hash": [0],
        "react/display-name": 0,
        "react/no-deprecated": "error",
        "react/no-unsafe": [
            "error",
            {
                checkAliases: true,
            },
        ],
        "react/jsx-sort-props": [
            "error",
            {
                ignoreCase: true,
            },
        ],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": 0,
        "prettier/prettier": ["error", prettierConfig],
    }
}