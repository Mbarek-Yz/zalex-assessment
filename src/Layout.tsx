import React from 'react';
import AppNavigator from '_navigation/AppNavigator';
import { store } from '_store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

const Layout = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default Layout;
