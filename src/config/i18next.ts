import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import global_en from "../translations/en/global_en.json"
import global_pl from "../translations/pl/global_pl.json"

const localStorageLanguage = localStorage.getItem("lang") || "pl"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: global_en,
      },
      pl: {
        translation: global_pl,
      },
    },
    lng: localStorageLanguage,
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
  });

  export default i18n;