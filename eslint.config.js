import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginNoLoops from "eslint-plugin-no-loops";
import eslintPluginNoSecrets from "eslint-plugin-no-secrets";
import sonarjs from "eslint-plugin-sonarjs";

export default [
  // Global ignores
  {
    ignores: ["backup/**", "node_modules/**", "dist/**"],
  },

  // Konfigurasi umum untuk berkas JavaScript dan Vue
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: {
      import: eslintPluginImport,
      "no-loops": eslintPluginNoLoops,
      "no-secrets": eslintPluginNoSecrets,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Aktifkan aturan Prettier sebagai error ESLint
      "prettier/prettier": "error",

      // Aturan dari eslint-plugin-no-secrets
      "no-secrets/no-secrets": "error",

      // Aturan dari eslint-plugin-no-loops
      "no-loops/no-loops": "warn", // Menggunakan 'warn' agar tidak terlalu mengganggu

      // Contoh aturan dari eslint-plugin-import (bisa dikustomisasi)
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/namespace": "error",
      "import/default": "error",
      "import/export": "error",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".mjs", ".vue"],
        },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".vue"],
        },
      },
    },
  },

  // Menambahkan konfigurasi yang direkomendasikan dari SonarJS
  sonarjs.configs.recommended,

  // Menggunakan konfigurasi dari eslint-plugin-vue
  ...pluginVue.configs["flat/strongly-recommended"],

  // Menerapkan konfigurasi Prettier untuk mematikan aturan yang berkonflik
  // HARUS DITEMPATKAN DI AKHIR.
  eslintConfigPrettier,
];
