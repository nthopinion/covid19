import i18n from 'i18next';
import backend from 'i18next-xhr-backend';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // string or array of namespaces to load
    ns: ['app', 'about', 'physicianView'],
    defaultNS: 'app',
    // array of allowed languages
    // @toDo add other languages
    whitelist: ['en', 'de'],
    // language to use if translations in user language are not available.
    fallbackLng: 'en',
    // if debug: true logs info level to console output. Helps finding issues with loading not working.
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
