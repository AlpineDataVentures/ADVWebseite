import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import astro from "eslint-plugin-astro";

export default [
  // Basis ESLint Regeln
  js.configs.recommended,

  // TypeScript Empfehlungen
  ...tseslint.configs.recommended,

  // Astro Empfehlungen
  ...astro.configs["flat/recommended"],

  // Regeln für JS/TS/React
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
    },
    rules: {
      // Eigene Anpassungen hier
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
