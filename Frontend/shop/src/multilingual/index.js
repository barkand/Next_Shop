import { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";

import cultures from "/src/multilingual/cultures";
import UseGlobalContext from "/src/context/global";
import "./locales/i18next";

export default function Language() {
  const globalContext = UseGlobalContext();
  const [mode, setMode] = useState(globalContext.culture.language);

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(mode);
    localStorage.setItem("lang", mode);
  }, [i18n, mode]);

  const toggleLang = () => {
    let lang = mode === "en" ? "fa" : "en";
    setMode(lang);
    globalContext.culture = cultures[lang];
  };

  return {
    culture: cultures[mode],
    toggleLang,
  };
}
