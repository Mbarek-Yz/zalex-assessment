module.exports = {
  preset: 'react-native',

  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@testing-library|@react-native-community|@reduxjs|immer|redux|react-redux|react-native-localize)/)',
  ],

  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest-setup.js',
  ],

  moduleNameMapper: {
    '^_hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^_components/(.*)$': '<rootDir>/src/components/$1',
    '^_utils/(.*)$': '<rootDir>/src/utils/$1',
    '^_helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^_i18n$': '<rootDir>/src/locales/i18n',
    '^_navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^_config/(.*)$': '<rootDir>/src/config/$1',
    '^_store/(.*)$': '<rootDir>/src/store/$1',
    '^_screens/(.*)$': '<rootDir>/src/screens/$1',
    '^_adapters/(.*)$': '<rootDir>/src/adapters/$1',
    '^_validation/(.*)$': '<rootDir>/src/validation/$1',

    '^_assets/(.*)$': '<rootDir>/src/assets/$1',

    '\\.(pdf)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',

    'react-native-blob-util': '<rootDir>/__mocks__/react-native-blob-util.js',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
