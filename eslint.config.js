import antfu from "@antfu/eslint-config"

export default antfu(
    {
        ignores: [".github"],
        solid: true,
    },
    {
        rules: {
            "no-console": "off",
            "prefer-const": "off",
            "ts/ban-ts-comment": "off",
            "prefer-promise-reject-errors": "off",
            "ts/no-use-before-define": "off",
            "style/indent": ["error", 4],
            "style/jsx-indent": ["error", 4],
            "style/jsx-indent-props": ["error", 4],
            "node/prefer-global/process": "off",
            "max-len": ["error", 160],
            "quotes": ["error", "double"],
            "style/quotes": ["error", "double"],
            "import/no-named-default": "off",
            "solid/no-destructure": "off",
            "eslint-comments/no-unlimited-disable": "off",
        },
    },
)
