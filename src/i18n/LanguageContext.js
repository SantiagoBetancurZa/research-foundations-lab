import { createContext, useContext } from 'react';

export const SUPPORTED_LANGUAGES = ['en'];
export const DEFAULT_LANGUAGE = 'en';

export const LanguageContext = createContext(null);

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return value;
}
