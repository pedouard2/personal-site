// eslint.config.mjs
import eslintPluginAstro from "eslint-plugin-astro";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  // 1. Global ignores
  { ignores: ["dist", ".astro", "node_modules"] },

  // 2. Astro Rules
  ...eslintPluginAstro.configs.recommended,

  // 3. React Rules
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    // vvvvv ADD THIS SECTION vvvvv
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // <--- This fixes "Unexpected token <"
        },
      },
    },
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
