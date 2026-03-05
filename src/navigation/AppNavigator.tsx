import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '_screens/HomeScreen/HomeScreen';
import RequestCertificateScreen from '_screens/RequestCertificateScreen/RequestCertificateScreen';
import CertificateDetailScreen from '_screens/CertificateDetailScreen/CertificateDetailScreen';
import {
  HOME_SCREEN,
  REQUEST_CERTIFICATE_SCREEN,
  CERTIFICATE_DETAILS_SCREEN,
} from '_utils/screenNames';

export type RootStackParamList = {
  [HOME_SCREEN]: undefined;
  [CERTIFICATE_DETAILS_SCREEN]: { reference: string };
  [REQUEST_CERTIFICATE_SCREEN]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={HOME_SCREEN}>
        <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen
          name={REQUEST_CERTIFICATE_SCREEN}
          component={RequestCertificateScreen}
        />
        <Stack.Screen
          name={CERTIFICATE_DETAILS_SCREEN}
          component={CertificateDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
