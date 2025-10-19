// eslint.config.js
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  // Astro empfohlene Config
  ...eslintPluginAstro.configs.recommended,

  // Ignores
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', '*.config.{js,mjs,cjs,ts}'],
  },

  // Custom Rules
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
