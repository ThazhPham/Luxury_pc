import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-locize-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import viVN from "./locales/vi-VN.json";
import en from "./locales/en.json";
import koKR from "./locales/ko-KR.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",

    resources: {
      "en": {
        login: en
      },
      "vi-VN": {
        login: viVN
      },
      "ko-KR": {
        login: koKR
      }
    },
    partialBundledLanguages: true,

    ns: ["login"],
    defaultNS: "login",

    backend: {
      projectId: "301326bb-9c3e-488d-9e32-32c444ac66b1",
      apiKey: "to0nurtf"
    },

    interpolation: {
      escapeValue: false
    },

    debug: true
  });

export default i18n;