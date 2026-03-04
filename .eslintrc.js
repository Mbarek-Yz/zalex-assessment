module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:jest/recommended'],
  plugins: ['jest'],
  env: {
    jest: true,
  },
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.test.ts', '**/*.test.tsx'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
