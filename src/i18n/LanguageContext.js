import { createContext, useContext } from 'react';

export const SUPPORTED_LANGUAGES = ['en', 'es'];
export const DEFAULT_LANGUAGE = 'en';

// Each language is named in its own language, so the switcher reads correctly in both.
export const LANGUAGE_NAMES = { en: 'English', es: 'Español' };

export const LanguageContext = createContext(null);

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return value;
}
