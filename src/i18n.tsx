import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './translations/english/translation.json';
import translationFrench from './translations/french/translation.json';

const resources = {
  en: {
    translation: translationEnglish,
  },
  fr: {
    translation: translationFrench,
  },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
  })
  .catch((e: Error) => e);
// todo console but not with lint
// console.error(e);

export default i18next;
