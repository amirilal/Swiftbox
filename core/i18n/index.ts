import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './translations/en.json';
import hi from './translations/hi.json';

const STORAGE_KEY = 'app-language';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
  
  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0]?.languageCode || 'en';
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

export const changeLanguage = async (language: string) => {
  await AsyncStorage.setItem(STORAGE_KEY, language);
  i18n.changeLanguage(language);
};

initI18n();

export default i18n;
