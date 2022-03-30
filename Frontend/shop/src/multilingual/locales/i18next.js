import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import publicFa from "./fa/public.json";
import publicEn from "./en/public.json";
import productFa from "./fa/product.json";
import productEn from "./en/product.json";

const resources = {
  fa: {
    public: publicFa,
    product: productFa,
  },
  en: {
    public: publicEn,
    product: productEn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en_US",
  fallbackLng: "en_US",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});
export default i18n;
