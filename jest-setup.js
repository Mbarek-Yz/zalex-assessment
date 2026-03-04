jest.mock('react-native-pdf', () => {
  const React = require('react');
  const { View } = require('react-native');

  return props => React.createElement(View, props, null);
});

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn(obj => obj.ios),
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.NativeModules.SettingsManager = {
    getConstants: () => ({
      settings: {
        AppleLocale: 'en_US',
      },
      AppleLanguages: ['en'],
    }),
  };

  RN.NativeModules.I18nManager = {
    localeIdentifier: 'en_US',
  };

  return RN;
});

jest.mock('_utils/constants', () => ({
  IS_IOS: true,
  DEBOUNCE_DELAY: 500,
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
  }),

  useRoute: () => ({
    params: {},
  }),

  NavigationContainer: ({ children }) => children,
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: () => null,
  }),
}));

jest.mock('axios');
jest.mock('@react-native-community/datetimepicker', () => () => null);
