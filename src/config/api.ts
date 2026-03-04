import Config from 'react-native-config';

export const BASE_URL = Config.SERVER_BASE_URL;
export const SUBSCRIPTION_KEY = Config.API_SUBSCRIPTION_KEY;

export const endpoints = {
  CERTIFICATE: 'request-certificate',
  LIST: 'request-list',
};
