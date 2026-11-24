import { Languages } from 'lucide-react';
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, useLanguage } from '../i18n/LanguageContext.js';

/** Two toggle buttons; each language name is marked with its own `lang` for screen readers. */
export default function LanguageSwitcher() {
  const { lang, setLang, ui } = useLanguage();

  return (
    <div
      role="group"
      aria-label={ui.languageLabel}
      className="on-light flashcard inline-flex items-center gap-1 p-1 shadow-deep-sm"
    >
      <Languages size={18} className="ml-2 mr-1 text-primary-400" />
      {SUPPORTED_LANGUAGES.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              active ? 'bg-primary-400 text-white' : 'text-ink-900 hover:bg-primary-400/8'
            }`}
          >
            {LANGUAGE_NAMES[code]}
          </button>
        );
      })}
    </div>
  );
}
