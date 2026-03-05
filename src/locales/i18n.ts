import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import * as RNLocalize from 'react-native-localize';

import en, { TranslationsType } from '_languages/en';

const i18nInstance = i18n.createInstance();

/**
 * Device language detection (Safe for Android + iOS)
 */
const getDeviceLanguage = (): string => {
  try {
    const locales = RNLocalize.getLocales();

    if (locales && locales.length > 0) {
      return locales[0].languageCode;
    }

    return 'en';
  } catch {
    return 'en';
  }
};

export const appLanguage: string = getDeviceLanguage();

i18nInstance
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      en: {
        translation: en,
      },
    },
    lng: appLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(err => {
    console.log('I18n error', err);
  });

/**
 * Translation helper
 */
export function translate(name: TxKeyPath, params = {}): string {
  return i18nInstance.t(name, params);
}

export default i18nInstance;

/**
 * Recursive translation key typing (Autocomplete safe)
 */
export type TxKeyPath = RecursiveKeyOf<TranslationsType>;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}${RecursiveKeyOfInner<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]:
    | `.${TKey}`
    | `['${TKey}']`
    | (TObj[TKey] extends object
        ? `${'.' | "['"}${TKey}${RecursiveKeyOfInner<TObj[TKey]>}`
        : never);
}[keyof TObj & (string | number)];
