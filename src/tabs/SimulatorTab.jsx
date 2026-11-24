import { useState } from 'react';
import {
  ArrowRight,
  ClipboardList,
  FlaskConical,
  Layers,
  Lightbulb,
  Play,
  RotateCcw,
  Target,
  Users,
} from 'lucide-react';
import Panel from '../components/Panel.jsx';
import { CaseInfoCard, VariableCard } from '../components/InfoCards.jsx';
import { useLanguage } from '../i18n/LanguageContext.js';

export default function SimulatorTab({ onUseCase = () => {} }) {
  const { ui, content } = useLanguage();
  const t = ui.simulator;
  const cases = content.cases;
  const [step, setStep] = useState(1);
  const [selectedScenarioId, setSelectedScenarioId] = useState(cases[0]?.id ?? '');
  const [running, setRunning] = useState(false);

  const selectedCase = cases.find((item) => item.id === selectedScenarioId) ?? cases[0];
  const selectedSimulation = content.simulator[selectedScenarioId];

  const selectScenario = (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    setRunning(false);
  };

  const runSimulation = () => {
    if (!selectedSimulation) return;
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setStep(4);
    }, 1600);
  };

  const resetSimulation = () => {
    setStep(1);
    setRunning(false);
    setSelectedScenarioId(cases[0]?.id ?? '');
  };

  const renderResults = () => {
    if (!selectedSimulation) return null;

    if (selectedSimulation.resultMode === 'association') {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {selectedSimulation.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      );
    }

    if (selectedSimulation.resultMode === 'themes') {
      return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {selectedSimulation.themes.map((theme) => (
            <div key={theme.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-indigo-700">
                {t.emergingCategory}
              </p>
              <h4 className="mb-2 text-lg font-bold text-slate-900">{theme.title}</h4>
              <p className="text-sm leading-relaxed text-slate-700">{theme.detail}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {selectedSimulation.bars.map((bar) => (
            <div key={bar.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-700">{bar.label}</p>
                <span className="text-xl font-bold text-slate-900">{bar.value}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.value}%` }} />
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
                {selectedSimulation.metricLabel}
              </p>
            </div>
          ))}
        </div>

        {selectedSimulation.secondaryFindings && (
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
              {t.complementary}
            </p>
            <div className="space-y-3">
              {selectedSimulation.secondaryFindings.map((finding) => (
                <div
                  key={finding}
                  className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700"
                >
                  {finding}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Panel>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
          <p className="mx-auto mt-2 max-w-3xl text-gray-600">{t.intro}</p>
        </div>

        <ol
          aria-label={t.progress}
          className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium"
        >
          {t.phases.map((label, index) => (
            <li
              key={label}
              aria-current={step === index + 1 ? 'step' : undefined}
              className={`rounded-full px-4 py-2 ${
                step >= index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}. {label}
            </li>
          ))}
        </ol>

        {step === 1 && (
          <div className="animate-fade-in-up space-y-6">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {cases.map((researchCase) => (
                <button
                  key={researchCase.id}
                  type="button"
                  onClick={() => selectScenario(researchCase.id)}
                  aria-pressed={researchCase.id === selectedScenarioId}
                  className={`rounded-3xl border p-5 text-left transition-all ${
                    researchCase.id === selectedScenarioId
                      ? 'border-indigo-300 bg-indigo-50 shadow-md shadow-indigo-100'
                      : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                      {researchCase.method}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-600">
                      {researchCase.area}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{researchCase.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">{researchCase.scenario}</p>
                  <p className="text-sm font-medium text-indigo-700">{researchCase.hook}</p>
                </button>
              ))}
            </div>

            {selectedCase && selectedSimulation && (
              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-2xl">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-indigo-200">
                  {t.selectedCase}
                </p>
                <h3 className="mb-3 text-2xl font-bold">{selectedCase.title}</h3>
                <p className="text-sm leading-relaxed text-slate-200">{selectedCase.question}</p>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 font-bold text-white transition-colors hover:bg-indigo-400"
                >
                  {t.buildDesign}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && selectedCase && selectedSimulation && (
          <div className="animate-fade-in-up space-y-6">
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-2xl md:p-8">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-indigo-200">
                    {t.designTitle}
                  </p>
                  <h3 className="text-2xl font-bold md:text-3xl">{selectedCase.title}</h3>
                </div>
                <span className="inline-flex w-fit rounded-full border border-indigo-300/30 bg-indigo-400/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">
                  {selectedCase.method}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CaseInfoCard icon={Target} label={t.objective} text={selectedSimulation.objective} />
                <CaseInfoCard
                  icon={Lightbulb}
                  label={selectedSimulation.focusLabel}
                  text={selectedSimulation.focus}
                />
                <CaseInfoCard icon={Users} label={t.sample} text={selectedSimulation.sample} />
                <CaseInfoCard icon={ClipboardList} label={t.procedure} text={selectedSimulation.procedure} />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Layers size={22} className="text-indigo-600" />
                <h4 className="text-lg font-bold text-slate-900">{t.varsTitle}</h4>
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

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <RotateCcw size={18} />
                {t.changeCase}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition-colors hover:bg-indigo-700"
              >
                {t.toExecution}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && selectedCase && selectedSimulation && (
          <div className="animate-fade-in-up rounded-3xl border border-purple-100 bg-purple-50 p-8 text-center">
            <FlaskConical
              size={68}
              className={`mx-auto mb-6 text-purple-600 ${running ? 'animate-bounce' : ''}`}
            />
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-purple-700">
              {selectedCase.method}
            </p>
            <h3 className="mb-3 text-2xl font-bold text-slate-900">{selectedSimulation.executionLabel}</h3>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600">
              {selectedSimulation.executionText}
            </p>

            <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/60 bg-white/80 p-4 text-left shadow-sm">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                {t.studyQuestion}
              </p>
              <p className="text-sm leading-relaxed text-slate-700">{selectedCase.question}</p>
            </div>

            {!running ? (
              <button
                type="button"
                onClick={runSimulation}
                className="mx-auto mt-8 flex items-center justify-center gap-3 rounded-xl bg-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-purple-700"
              >
                <Play size={22} />
                {t.run}
              </button>
            ) : (
              <div className="mt-8 flex flex-col items-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
                <p className="mt-4 text-sm font-medium text-slate-600">{t.running}</p>
              </div>
            )}
          </div>
        )}

        {step === 4 && selectedCase && selectedSimulation && (
          <div className="animate-fade-in-up space-y-6">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
                    {t.findings}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedCase.title}</h3>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
                  {selectedCase.method}
                </span>
              </div>

              {renderResults()}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-200">
                  {t.reading}
                </p>
                <div className="space-y-4 text-sm leading-relaxed text-slate-200">
                  <div>
                    <p className="mb-1 font-semibold text-white">{t.keyInsight}</p>
                    <p>{selectedSimulation.keyInsight}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-white">{t.discussion}</p>
                    <p>{selectedSimulation.discussion}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                  {t.closing}
                </p>
                <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                  <div>
                    <p className="mb-1 font-semibold text-slate-900">{t.limitation}</p>
                    <p>{selectedSimulation.limitation}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-slate-900">{t.communication}</p>
                    <p>{selectedSimulation.communication}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <RotateCcw size={18} />
                {t.adjustDesign}
              </button>
              <button
                type="button"
                onClick={() => onUseCase(selectedCase.id)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition-colors hover:bg-indigo-700"
              >
                {t.toAi}
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={resetSimulation}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-bold text-white transition-colors hover:bg-slate-800"
              >
                <RotateCcw size={18} />
                {t.reset}
              </button>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
