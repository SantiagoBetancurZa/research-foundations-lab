import { useEffect, useMemo, useState } from 'react';
import { getContent } from '../content/index.js';
import { STRINGS } from './strings.js';
import { DEFAULT_LANGUAGE, LanguageContext, SUPPORTED_LANGUAGES } from './LanguageContext.js';

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: (next) => SUPPORTED_LANGUAGES.includes(next) && setLang(next),
      ui: STRINGS[lang] ?? STRINGS[DEFAULT_LANGUAGE],
      content: getContent(lang),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
