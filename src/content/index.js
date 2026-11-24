// Merges the language-independent structure with the text of one language.
import {
  PROCESS_STEPS,
  CONCEPTS,
  RESEARCH_TYPES,
  INSTRUMENTS,
  CASES,
  ARTICLE_SECTIONS,
} from './structure.js';
import en from './en.js';
import es from './es.js';

const TEXT = { en, es };

const merge = (items, texts) => items.map((item) => ({ ...item, ...texts[item.id] }));

const cache = new Map();

export function getContent(lang) {
  if (cache.has(lang)) return cache.get(lang);
  const text = TEXT[lang] ?? TEXT.en;
  const content = {
    processSteps: merge(PROCESS_STEPS, text.processSteps),
    concepts: merge(CONCEPTS, text.concepts),
    researchTypes: merge(RESEARCH_TYPES, text.researchTypes),
    instruments: merge(INSTRUMENTS, text.instruments),
    cases: merge(CASES, text.cases),
    articleSections: merge(ARTICLE_SECTIONS, text.articleSections),
    simulator: text.simulator,
  };
  cache.set(lang, content);
  return content;
}
