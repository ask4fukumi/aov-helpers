/** @type {import("prettier").Config} */
const prettierConfig = {
  plugins: [await import("prettier-plugin-tailwindcss")],
  tailwindAttributes: [
    "className",
    "class",
    "ngClass",
    "class:list",
    ".*(Class|Style|Variant).*",
  ],
  tailwindFunctions: ["cn", "cva", "tv"],
  semi: false,
  trailingComma: "all",
  singleQuote: false,
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
}

export default prettierConfig
