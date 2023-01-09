import react, { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useTuning } from "./TuningContext";

// load locales files
const loadLocaleData = (locale) => {
  switch (locale) {
    case "fr":
      return import("../utils/locales/fr.json");
    case "ro":
      return import("../utils/locales/ro.json");
    case "zh":
      return import("../utils/locales/zh.json");
    case "ar":
      return import("../utils/locales/ar.json");
    case "es":
      return import("../utils/locales/es.json");
    case "he":
      return import("../utils/locales/he.json");
    case "hi":
      return import("../utils/locales/hi.json");
    case "it":
      return import("../utils/locales/it.json");
    case "ja":
      return import("../utils/locales/ja.json");
    default:
      return import("../utils/locales/en.json");
  }
};

const Locales = ({ children }) => {
  const { locale } = useTuning();
  const [messages, setMessages] = useState();

  useEffect(() => {
    loadLocaleData(locale).then((d) => {
      console.log(d.default);
      setMessages(d.default);
    });
  }, [locale]);

  return (
    <>
      {messages && (
        <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
};

export default Locales;
