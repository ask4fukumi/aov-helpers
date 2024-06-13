/** @type {import("prettier").Config} */
const prettierConfig = {
    plugins: [await import("prettier-plugin-tailwindcss")],
    tailwindAttributes: [
        "className",
        "class",
        "ngClass",
        ".*Styles.*",
        ".*Classes.*",
    ],
    tailwindFunctions: ["cn"],
    semi: false,
    trailingComma: "all",
    singleQuote: false,
    printWidth: 80,
    useTabs: false,
    tabWidth: 2,
}

export default prettierConfig
