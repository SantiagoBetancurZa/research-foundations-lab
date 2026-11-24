import { useEffect, useMemo, useState } from 'react';
import { getContent } from '../content/index.js';
import { STRINGS } from './strings.js';
import { DEFAULT_LANGUAGE, LanguageContext, SUPPORTED_LANGUAGES } from './LanguageContext.js';

const STORAGE_KEY = 'research-foundations-lab:lang';
const isSupported = (value) => SUPPORTED_LANGUAGES.includes(value);

// English by default. A link can ask for a language with ?lang=es, and the last choice is
// remembered on this device. Storage may be blocked (private mode), so every access is guarded.
function initialLanguage() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isSupported(fromUrl)) return fromUrl;
  } catch {
    // Ignore malformed URLs.
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isSupported(stored)) return stored;
  } catch {
    // Storage unavailable.
  }
  return DEFAULT_LANGUAGE;
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = (STRINGS[lang] ?? STRINGS[DEFAULT_LANGUAGE]).appTitle;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage unavailable: the choice simply is not remembered.
    }
    try {
      // Keep a shared ?lang= link in step with the current choice.
      const url = new URL(window.location.href);
      if (url.searchParams.has('lang') && url.searchParams.get('lang') !== lang) {
        url.searchParams.set('lang', lang);
        window.history.replaceState(window.history.state, '', url);
      }
    } catch {
      // History API unavailable.
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: (next) => isSupported(next) && setLang(next),
      ui: STRINGS[lang] ?? STRINGS[DEFAULT_LANGUAGE],
      content: getContent(lang),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
