import { useState } from 'react';
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
  Share2,
  TestTube,
} from 'lucide-react';
import Panel from '../components/Panel.jsx';
import { ConceptItem } from '../components/InfoCards.jsx';
import { useLanguage } from '../i18n/LanguageContext.js';

const SYSTEM_PROMPT = `You are an expert in scientific methodology. Analyze the user's observation and produce a thorough research design.
Answer ONLY with valid JSON using these keys:
- summary: one paragraph summarizing the user's observation.
- method: an object with question, hypothesis, experiment, analysis, conclusion, communication.
- concepts: an object with independentVariable, dependentVariable, controlVariables, controlGroup, experimentalGroup, possibleBias, correlation.
Make every text educational and clear, in English.`;

export default function AiDesignerTab({ observation, onObservationChange }) {
  const { ui } = useLanguage();
  const t = ui.ai;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!observation.trim()) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    if (!apiKey) {
      setError(t.notConfigured);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ parts: [{ text: `User observation: ${observation}` }] }],
      generationConfig: { responseMimeType: 'application/json' },
    };

    const fetchWithRetry = async (retries = 5) => {
      for (let index = 0; index < retries; index += 1) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error('API Error');
          return await response.json();
        } catch (fetchError) {
          if (index === retries - 1) throw fetchError;
          await new Promise((resolve) => {
            setTimeout(resolve, 1000 * 2 ** index);
          });
        }
      }
      return null;
    };

    try {
      const data = await fetchWithRetry();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response');
      setResult(JSON.parse(text.replace(/```json|```/g, '').trim()));
    } catch {
      setError(t.failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel>
      <div className="mx-auto max-w-4xl">
        <div className="animate-fade-in-up mb-8 text-center">
          <Bot size={48} className="mx-auto mb-4 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
          <p className="mt-2 text-gray-600">{t.intro}</p>
        </div>

        <div className="mb-8 rounded-xl border border-indigo-100 bg-indigo-50 p-6 shadow-inner">
          <textarea
            className="w-full resize-none rounded-lg border border-gray-300 p-4 shadow-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500"
            rows="3"
            placeholder={t.placeholder}
            value={observation}
            onChange={(event) => {
              setError('');
              setResult(null);
              onObservationChange(event.target.value);
            }}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !observation.trim()}
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-bold text-white shadow-md transition-colors hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? t.generating : t.generate}
          </button>
        </div>

        {error && <div className="mb-6 rounded-lg bg-red-100 p-3 text-center text-red-700">{error}</div>}

        {result && (
          <div className="animate-fade-in-up space-y-8 pb-10">
            <section className="rounded-2xl border-l-4 border-indigo-500 bg-white p-6 shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-800">
                <ClipboardList size={20} className="text-indigo-500" />
                {t.context}
              </h3>
              <p className="leading-relaxed text-gray-700 italic">{result.summary}</p>
            </section>

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <Layers size={24} className="text-indigo-600" /> {t.methodApplied}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: t.question, val: result.method?.question, icon: HelpCircle, color: 'text-blue-600' },
                  { label: t.hypothesis, val: result.method?.hypothesis, icon: Lightbulb, color: 'text-yellow-600' },
                  { label: t.experiment, val: result.method?.experiment, icon: TestTube, color: 'text-purple-600' },
                  { label: t.analysis, val: result.method?.analysis, icon: LineChart, color: 'text-emerald-600' },
                  { label: t.conclusion, val: result.method?.conclusion, icon: CheckSquare, color: 'text-red-600' },
                  { label: t.communication, val: result.method?.communication, icon: Share2, color: 'text-indigo-600' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <item.icon size={18} className={item.color} />
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{item.val}</p>
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
                  <ConceptItem label={t.independent} val={result.concepts?.independentVariable} sub={t.independentSub} />
                  <ConceptItem label={t.dependent} val={result.concepts?.dependentVariable} sub={t.dependentSub} />
                  <ConceptItem label={t.control} val={result.concepts?.controlVariables} sub={t.controlSub} />
                </div>
                <div className="space-y-4">
                  <ConceptItem
                    label={t.groups}
                    val={`${result.concepts?.controlGroup} vs ${result.concepts?.experimentalGroup}`}
                    sub={t.groupsSub}
                  />
                  <ConceptItem label={t.bias} val={result.concepts?.possibleBias} sub={t.biasSub} />
                  <ConceptItem label={t.correlation} val={result.concepts?.correlation} sub={t.correlationSub} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
