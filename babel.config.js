module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      '@babel/plugin-transform-export-namespace-from',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            _env: './src/config/env',
            _config: './src/config',
            _components: './src/components/',
            _screens: './src/screens/',
            _adapters: './src/adapters/',
            _enums: './src/enums/',
            _utils: './src/utils/',
            _navigation: './src/navigation',
            _hooks: './src/hooks/',
            _languages: './src/locales/languages',
            _assets: './src/assets',
            _i18n: './src/locales/i18n',
            _helpers: './src/helpers',
            _validation: './src/validation',
          },
        },
      ],
    ],
    presets: ['module:@react-native/babel-preset'],
  };
};
