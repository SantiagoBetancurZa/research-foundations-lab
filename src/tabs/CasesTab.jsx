import { useState } from 'react';
import { ArrowRight, ClipboardList, Eye, HelpCircle, LineChart, TestTube } from 'lucide-react';
import Panel from '../components/Panel.jsx';
import { CaseInfoCard, VariableCard } from '../components/InfoCards.jsx';
import { useLanguage } from '../i18n/LanguageContext.js';

export default function CasesTab({ onUseCase }) {
  const { ui, content } = useLanguage();
  const t = ui.cases;
  const cases = content.cases;
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0].id);
  const selectedCase = cases.find((item) => item.id === selectedCaseId) ?? cases[0];

  return (
    <Panel>
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">{t.title}</h2>
        <p className="mx-auto max-w-3xl text-gray-500">{t.intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
        <div className="space-y-3">
          {cases.map((researchCase) => (
            <button
              key={researchCase.id}
              type="button"
              onClick={() => setSelectedCaseId(researchCase.id)}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                researchCase.id === selectedCaseId
                  ? 'border-indigo-300 bg-indigo-50 shadow-md shadow-indigo-100'
                  : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50'
              }`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-600">
                  {researchCase.area}
                </span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                  {researchCase.method}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{researchCase.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{researchCase.hook}</p>
            </button>
          ))}
        </div>

        <div
          key={selectedCase.id}
          className="animate-fade-in-up rounded-3xl bg-slate-900 p-6 text-white shadow-2xl md:p-8"
        >
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-indigo-200">
                {selectedCase.area}
              </p>
              <h3 className="text-2xl font-bold md:text-3xl">{selectedCase.title}</h3>
            </div>
            <span className="inline-flex w-fit rounded-full border border-indigo-300/30 bg-indigo-400/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">
              {t.level(selectedCase.level)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CaseInfoCard icon={Eye} label={t.scenario} text={selectedCase.scenario} />
            <CaseInfoCard icon={HelpCircle} label={t.question} text={selectedCase.question} />
            <CaseInfoCard icon={TestTube} label={t.design} text={selectedCase.design} />
            <CaseInfoCard icon={LineChart} label={t.analysis} text={selectedCase.analysis} />
          </div>

          <div className="mt-6 rounded-3xl bg-white p-5 text-slate-900 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <ClipboardList size={20} className="text-indigo-600" />
              <h4 className="text-lg font-bold">{t.variablesTitle}</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <VariableCard label={t.independent} value={selectedCase.variables.independent} />
              <VariableCard label={t.dependent} value={selectedCase.variables.dependent} />
              <VariableCard label={t.control} value={selectedCase.variables.control} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <VariableCard label={t.instruments} value={selectedCase.instruments} />
              <VariableCard label={t.bias} value={selectedCase.bias} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
              {t.seed}
            </p>
            <p className="text-sm leading-relaxed text-emerald-50">{selectedCase.seedObservation}</p>
          </div>

          <button
            type="button"
            onClick={() => onUseCase(selectedCase.id)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 font-bold text-white transition-colors hover:bg-indigo-400"
          >
            {t.useInAi}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </Panel>
  );
}
