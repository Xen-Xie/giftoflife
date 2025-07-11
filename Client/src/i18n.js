import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../public/locales/en/translation.json';
import bnTranslation from '../public/locales/bn/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: enTranslation,
      },
      bn: {
        translation: bnTranslation,
      },
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
