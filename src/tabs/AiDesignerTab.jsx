import { useEffect, useState } from 'react';
import {
  BookOpen,
  Bot,
  CheckSquare,
  ClipboardList,
  HelpCircle,
  Info,
  Layers,
  Lightbulb,
  LineChart,
  Scale,
  Share2,
  TestTube,
} from 'lucide-react';
import Panel from '../components/Panel.jsx';
import { ConceptItem } from '../components/InfoCards.jsx';
import { getSampleDesign } from '../content/sampleDesigns.js';
import { useLanguage } from '../i18n/LanguageContext.js';

const API_URL = '/api/design';
const MIN_CHARS = 15;
const MAX_CHARS = 1200;
// Error codes that mean "the live AI is not set up here": show the prepared examples instead.
const UNAVAILABLE = new Set(['not_configured', 'upstream_auth', 'model_unavailable', 'unavailable']);

const isJson = (response) => (response.headers.get('content-type') ?? '').includes('application/json');

async function fetchAvailability(signal) {
  try {
    const response = await fetch(API_URL, { signal, headers: { Accept: 'application/json' } });
    if (!response.ok || !isJson(response)) return false;
    return (await response.json())?.available === true;
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    return false;
  }
}

async function requestDesign(observation, lang) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ observation, lang }),
    });
    const data = isJson(response) ? await response.json().catch(() => null) : null;
    if (response.ok && data?.design) return { design: data.design, model: data.model };
    return { error: data?.error ?? 'unavailable' };
  } catch {
    return { error: 'network' };
  }
}

function DesignReport({ design, badge, t }) {
  const methodItems = [
    { key: 'question', label: t.question, icon: HelpCircle, color: 'text-blue-600' },
    { key: 'hypothesis', label: t.hypothesis, icon: Lightbulb, color: 'text-yellow-600' },
    { key: 'experiment', label: t.experiment, icon: TestTube, color: 'text-purple-600' },
    { key: 'analysis', label: t.analysis, icon: LineChart, color: 'text-emerald-600' },
    { key: 'conclusion', label: t.conclusion, icon: CheckSquare, color: 'text-red-600' },
    { key: 'communication', label: t.communication, icon: Share2, color: 'text-indigo-600' },
    { key: 'ethics', label: t.ethics, icon: Scale, color: 'text-teal-600' },
  ].filter((item) => design.method?.[item.key]);
  const concepts = design.concepts ?? {};

  return (
    <div className="animate-fade-in-up space-y-8 pb-10">
      <p className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm text-indigo-900">
        {badge}
      </p>

      <section className="rounded-2xl border-l-4 border-indigo-500 bg-white p-6 shadow-sm">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-800">
          <ClipboardList size={20} className="text-indigo-500" />
          {t.context}
        </h3>
        <p className="leading-relaxed text-gray-700 italic">{design.summary}</p>
      </section>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
          <Layers size={24} className="text-indigo-600" /> {t.methodApplied}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {methodItems.map((item) => (
            <div
              key={item.key}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200"
            >
              <div className="mb-2 flex items-center gap-2">
                <item.icon size={18} className={item.color} />
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                  {item.label}
                </span>
              </div>
              <p className="text-sm text-gray-700">{design.method[item.key]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 text-white shadow-2xl">
        <div className="absolute right-0 top-0 p-8 opacity-10">
          <Info size={120} />
        </div>
        <h3 className="relative z-10 mb-6 flex items-center gap-2 text-2xl font-bold">
          <BookOpen size={28} className="text-indigo-400" /> {t.variablesTitle}
        </h3>
        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <ConceptItem label={t.independent} val={concepts.independentVariable} sub={t.independentSub} />
            <ConceptItem label={t.dependent} val={concepts.dependentVariable} sub={t.dependentSub} />
            <ConceptItem label={t.control} val={concepts.controlVariables} sub={t.controlSub} />
          </div>
          <div className="space-y-4">
            <ConceptItem
              label={t.groups}
              val={`${concepts.controlGroup} / ${concepts.experimentalGroup}`}
              sub={t.groupsSub}
            />
            <ConceptItem label={t.bias} val={concepts.possibleBias} sub={t.biasSub} />
            <ConceptItem label={t.correlation} val={concepts.correlation} sub={t.correlationSub} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiDesignerTab({ observation, caseId, onObservationChange, onCaseSelect }) {
  const { lang, ui, content } = useLanguage();
  const t = ui.ai;
  const [available, setAvailable] = useState(null);
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [errorCode, setErrorCode] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchAvailability(controller.signal)
      .then(setAvailable)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  // Without the live AI, a case chosen elsewhere in the app opens its prepared example directly.
  const shown = result ?? (available === false && caseId ? { source: 'sample', caseId } : null);
  const sampleCase = shown?.source === 'sample' ? content.cases.find((item) => item.id === shown.caseId) : null;
  const sampleDesign = sampleCase ? getSampleDesign(lang, sampleCase.id) : null;
  const trimmedLength = observation.trim().length;
  const canGenerate = trimmedLength >= MIN_CHARS && trimmedLength <= MAX_CHARS && status !== 'loading';

  const showSample = (id) => {
    onCaseSelect(id);
    setErrorCode('');
    setStatus('idle');
    setResult({ source: 'sample', caseId: id });
  };

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setStatus('loading');
    setErrorCode('');
    setResult(null);

    const response = await requestDesign(observation.trim(), lang);
    if (response.design) {
      setResult({ source: 'ai', design: response.design, model: response.model });
      setStatus('done');
      return;
    }
    if (UNAVAILABLE.has(response.error)) {
      setAvailable(false);
      setStatus('idle');
      if (caseId) setResult({ source: 'sample', caseId });
      return;
    }
    setErrorCode(response.error);
    setStatus('error');
  };

  const errorMessage = (() => {
    if (!errorCode) return '';
    if (errorCode === 'invalid_length') return t.errors.invalid_length(MIN_CHARS, MAX_CHARS);
    return t.errors[errorCode] ?? t.errors.generic;
  })();

  return (
    <Panel>
      <div className="mx-auto max-w-4xl">
        <div className="animate-fade-in-up mb-8 text-center">
          <Bot size={48} className="mx-auto mb-4 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
          <p className="mt-2 text-gray-600">{t.intro}</p>
        </div>

        {available === false && (
          <div role="status" className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950">
            <p className="font-semibold">{t.unavailableTitle}</p>
            <p className="mt-1 text-sm">{t.unavailableText}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.cases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => showSample(item.id)}
                  aria-pressed={sampleCase?.id === item.id}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                    sampleCase?.id === item.id
                      ? 'border-amber-700 bg-amber-700 text-white'
                      : 'border-amber-400 bg-white text-amber-950 hover:bg-amber-100'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8 rounded-xl border border-indigo-100 bg-indigo-50 p-6 shadow-inner">
          <label htmlFor="ai-observation" className="mb-1 block font-semibold text-gray-800">
            {t.observationLabel}
          </label>
          <p id="ai-observation-hint" className="mb-3 text-sm text-gray-600">
            {t.observationHint(MIN_CHARS, MAX_CHARS)}
          </p>
          <textarea
            id="ai-observation"
            aria-describedby="ai-observation-hint ai-observation-count"
            className="w-full resize-y rounded-lg border border-gray-300 bg-white p-4 shadow-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500"
            rows="3"
            maxLength={MAX_CHARS}
            placeholder={t.placeholder}
            value={observation}
            onChange={(event) => {
              setErrorCode('');
              if (result?.source === 'ai') setResult(null);
              onObservationChange(event.target.value);
            }}
          />
          <p id="ai-observation-count" className="mt-1 text-right text-xs text-gray-600">
            {t.counter(observation.length, MAX_CHARS)}
          </p>

          <p className="mt-3 text-sm font-medium text-gray-700">{t.startFromCase}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {content.cases.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onCaseSelect(item.id);
                  setErrorCode('');
                  setResult(null);
                }}
                className="rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-sm text-indigo-800 transition-colors hover:bg-indigo-100"
              >
                {item.title}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-bold text-white shadow-md transition-colors hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {status === 'loading' ? t.generating : t.generate}
          </button>
        </div>

        <div aria-live="polite" className="sr-only">
          {status === 'loading' ? t.generating : ''}
        </div>

        {errorMessage && (
          <div role="alert" className="mb-6 rounded-lg bg-red-100 p-3 text-center text-red-800">
            {errorMessage}
          </div>
        )}

        {shown?.source === 'ai' && <DesignReport design={shown.design} badge={t.aiBadge} t={t} />}
        {sampleDesign && (
          <DesignReport design={sampleDesign} badge={t.sampleBadge(sampleCase.title)} t={t} />
        )}
      </div>
    </Panel>
  );
}
