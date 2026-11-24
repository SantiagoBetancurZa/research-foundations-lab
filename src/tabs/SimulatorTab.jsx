import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ClipboardList,
  Dices,
  FlaskConical,
  Layers,
  Lightbulb,
  Play,
  Repeat,
  RotateCcw,
  SlidersHorizontal,
  Target,
  Users,
} from 'lucide-react';
import Panel from '../components/Panel.jsx';
import { CaseInfoCard, VariableCard } from '../components/InfoCards.jsx';
import { Histogram, ScatterPlot, StripPlot } from '../components/Charts.jsx';
import { useLanguage } from '../i18n/LanguageContext.js';
import { EFFECT_LEVELS, SIMULATIONS, effectValue, replicate, runSimulation } from '../lib/simulations.js';
import { correlationLabel, effectSizeLabel, formatP } from '../lib/stats.js';

function useFormatters(lang) {
  const locale = lang === 'es' ? 'es-CO' : 'en-US';
  const number = (value, digits = 1) =>
    new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  const percent = (value) => new Intl.NumberFormat(locale, { style: 'percent' }).format(value);
  const p = (value) => (lang === 'es' ? formatP(value).replace('.', ',') : formatP(value));
  return { number, percent, p };
}

const sectionLabel = 'mb-2 text-xs font-semibold uppercase tracking-[0.2em]';

function Verdict({ significant, t }) {
  return (
    <p
      className={`rounded-card border px-4 py-3 text-sm leading-relaxed ${
        significant
          ? 'border-primary-300/85 bg-primary-400/8 text-ink-900'
          : 'border-gray-300 bg-gray-50 text-ink-900'
      }`}
    >
      {significant ? t.results.significant : t.results.notSignificant}
    </p>
  );
}

function TwoGroupResults({ result, text, t, fmt }) {
  const [control, treatment] = result.groups;
  const labels = text.groups;
  const significant = result.test.p < 0.05;
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <figure className="rounded-card border border-gray-300 bg-white p-4 shadow-card-sm">
        <StripPlot
          groups={[
            { ...control, label: labels[0] },
            { ...treatment, label: labels[1] },
          ]}
          yLabel={text.metric}
          title={t.charts.strip}
          desc={t.charts.stripDesc(labels, fmt.number(control.mean), fmt.number(treatment.mean))}
        />
        <figcaption className="mt-2 text-xs leading-relaxed text-gray-800">{t.charts.stripCaption}</figcaption>
      </figure>

      <div className="space-y-4">
        <div className="overflow-x-auto rounded-card border border-gray-300 bg-white shadow-card-sm">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{t.table.caption}</caption>
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-800">
              <tr>
                <th scope="col" className="px-3 py-2">{t.table.group}</th>
                <th scope="col" className="px-3 py-2">n</th>
                <th scope="col" className="px-3 py-2">{t.table.mean}</th>
                <th scope="col" className="px-3 py-2">{t.table.sd}</th>
                <th scope="col" className="px-3 py-2">{t.table.ci}</th>
              </tr>
            </thead>
            <tbody>
              {[control, treatment].map((group, index) => (
                <tr key={labels[index]} className="border-t border-gray-300">
                  <th scope="row" className="px-3 py-2 font-medium text-ink-900">{labels[index]}</th>
                  <td className="px-3 py-2">{group.n}</td>
                  <td className="px-3 py-2">{fmt.number(group.mean)}</td>
                  <td className="px-3 py-2">{fmt.number(group.sd)}</td>
                  <td className="whitespace-nowrap px-3 py-2">
                    [{fmt.number(group.ci[0])}; {fmt.number(group.ci[1])}]
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="space-y-2 rounded-card border border-gray-300 bg-white p-4 text-sm text-ink-900 shadow-card-sm">
          <li>
            {t.results.difference(
              fmt.number(result.test.diff),
              fmt.number(result.test.ci[0]),
              fmt.number(result.test.ci[1]),
            )}
          </li>
          <li>{t.results.welch(fmt.number(result.test.t, 2), fmt.number(result.test.df), fmt.p(result.test.p))}</li>
          <li>{t.results.cohen(fmt.number(result.d, 2), t.sizes[effectSizeLabel(result.d)])}</li>
        </ul>
        <Verdict significant={significant} t={t} />
      </div>
    </div>
  );
}

function CorrelationResults({ result, text, t, fmt }) {
  const significant = result.p < 0.05;
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <figure className="rounded-card border border-gray-300 bg-white p-4 shadow-card-sm">
        <ScatterPlot
          x={result.x}
          y={result.y}
          slope={result.slope}
          intercept={result.intercept}
          xDomain={[0, 150]}
          yDomain={[0, 10]}
          xLabel={text.xLabel}
          yLabel={text.yLabel}
          title={t.charts.scatter}
          desc={t.charts.scatterDesc(result.n, fmt.number(result.r, 2))}
        />
        <figcaption className="mt-2 text-xs leading-relaxed text-gray-800">{t.charts.scatterCaption}</figcaption>
      </figure>

      <div className="space-y-4">
        <dl className="grid grid-cols-2 gap-3">
          {[
            [text.heavyUse, result.heavyUseShare],
            [text.poorSleep, result.poorSleepShare],
          ].map(([label, value]) => (
            <div key={label} className="rounded-card border border-gray-300 bg-white p-4 text-center shadow-card-sm">
              <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-800">{label}</dt>
              <dd className="text-2xl font-semibold text-ink-900">{fmt.percent(value)}</dd>
            </div>
          ))}
        </dl>
        <ul className="space-y-2 rounded-card border border-gray-300 bg-white p-4 text-sm text-ink-900 shadow-card-sm">
          <li>{t.results.correlation(fmt.number(result.r, 2), fmt.number(result.ci[0], 2), fmt.number(result.ci[1], 2))}</li>
          <li>{t.results.correlationTest(fmt.number(result.t, 2), result.df, fmt.p(result.p))}</li>
          <li>{t.results.rSquared(fmt.number(result.r * result.r, 2), fmt.percent(result.r * result.r))}</li>
        </ul>
        <Verdict significant={significant} t={t} />
        <p className="rounded-card border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-ink-900">
          {t.results.correlationWarning}
        </p>
      </div>
    </div>
  );
}

function ThemeResults({ result, text, t }) {
  const n = result.perProfile;
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-card border border-gray-300 bg-white shadow-card-sm">
        <table className="w-full text-left text-sm">
          <caption className="px-4 pt-4 text-left text-sm font-semibold text-ink-900">{t.matrix.caption}</caption>
          <thead className="text-xs uppercase tracking-wide text-gray-800">
            <tr>
              <th scope="col" className="px-4 py-2">{t.matrix.theme}</th>
              {text.profiles.map((profile) => (
                <th key={profile} scope="col" className="px-4 py-2">
                  {profile} (n = {n})
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {text.themes.map((theme, index) => (
              <tr key={theme.title} className="border-t border-gray-300 align-top">
                <th scope="row" className="px-4 py-3">
                  <span className="block font-semibold text-ink-900">{theme.title}</span>
                  <span className="mt-1 block text-xs font-normal leading-relaxed text-gray-800">{theme.detail}</span>
                </th>
                {result.counts[index].map((count, column) => (
                  <td key={column} className="min-w-36 px-4 py-3">
                    <span className="mb-1 block font-medium text-ink-900">{t.matrix.of(count, n)}</span>
                    <span className="block h-2.5 overflow-hidden rounded-full bg-gray-50">
                      <span
                        className={`block h-full rounded-full ${column === 0 ? 'bg-primary-400' : 'bg-gray-800'}`}
                        style={{ width: `${(count / n) * 100}%` }}
                      />
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="rounded-card border border-primary-300/85 bg-primary-400/8 px-4 py-3 text-sm text-ink-900">{text.countsNote}</p>
    </div>
  );
}

function ReplicationPanel({ caseId, sampleSize, effect, result, t, fmt }) {
  const [replication, setReplication] = useState(null);
  const truth = result.kind === 'two-groups' ? result.trueDifference : result.trueRho;
  const digits = result.kind === 'two-groups' ? 1 : 2;
  const share = replication ? replication.significant / replication.runs : 0;

  return (
    <section aria-labelledby="replication-title" className="rounded-card border border-primary-300/85 bg-white p-6 shadow-card-sm">
      <h4 id="replication-title" className="mb-2 flex items-center gap-2 text-lg font-semibold text-ink-900">
        <Repeat size={20} className="text-primary-400" />
        {t.replication.title}
      </h4>
      <p className="mb-4 text-sm leading-relaxed text-gray-800">{t.replication.intro}</p>
      {!replication ? (
        <button
          type="button"
          onClick={() => setReplication(replicate(caseId, { n: sampleSize, level: effect }))}
          className="flex items-center gap-2 rounded-card bg-primary-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-500"
        >
          <Repeat size={18} />
          {t.replicate}
        </button>
      ) : (
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
          <div aria-live="polite">
            <p className="text-2xl font-semibold text-ink-900">
              {t.replication.summary(replication.significant, replication.runs, fmt.percent(share))}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-800">
              {effect === 'none' ? t.replication.falsePositives : t.replication.power}
            </p>
          </div>
          <figure>
            <Histogram
              values={replication.estimates}
              marker={truth}
              markerLabel={t.replication.markerLabel}
              title={result.kind === 'two-groups' ? t.replication.histDiff : t.replication.histR}
              desc={t.replication.histDesc(
                fmt.number(Math.min(...replication.estimates), digits),
                fmt.number(Math.max(...replication.estimates), digits),
                fmt.number(truth, digits),
              )}
            />
            <figcaption className="text-xs text-gray-800">
              {result.kind === 'two-groups' ? t.replication.histDiff : t.replication.histR}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

export default function SimulatorTab({ onUseCase = () => {} }) {
  const { lang, ui, content } = useLanguage();
  const t = ui.simulator;
  const fmt = useFormatters(lang);
  const cases = content.cases;
  const [step, setStep] = useState(1);
  const [caseId, setCaseId] = useState(cases[0].id);
  const [sampleSize, setSampleSize] = useState(SIMULATIONS[cases[0].id].sampleSize.default);
  const [effect, setEffect] = useState(SIMULATIONS[cases[0].id].defaultEffect);
  const [nextSeed, setNextSeed] = useState(SIMULATIONS[cases[0].id].firstSeed);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const headingRef = useRef(null);
  const navigated = useRef(false);

  const config = SIMULATIONS[caseId];
  const selectedCase = cases.find((item) => item.id === caseId) ?? cases[0];
  const text = content.simulator[caseId];
  const quantitative = config.kind !== 'themes';

  // Move keyboard and screen-reader focus to the heading of each new step.
  useEffect(() => {
    if (navigated.current) headingRef.current?.focus();
  }, [step]);

  const goTo = (next) => {
    navigated.current = true;
    setStep(next);
  };

  const selectScenario = (id) => {
    const scenario = SIMULATIONS[id];
    setCaseId(id);
    setSampleSize(scenario.sampleSize.default);
    setEffect(scenario.defaultEffect ?? 'none');
    setNextSeed(scenario.firstSeed);
    setResult(null);
  };

  const drawSample = () => {
    setResult(runSimulation(caseId, { n: sampleSize, level: effect, seed: nextSeed }));
    setNextSeed((seed) => seed + 1);
  };

  const execute = () => {
    setRunning(true);
    window.setTimeout(() => {
      drawSample();
      setRunning(false);
      goTo(4);
    }, 900);
  };

  const resetSimulation = () => {
    selectScenario(cases[0].id);
    goTo(1);
  };

  const sampleText = text.sample(config.kind === 'themes' ? config.sampleSize.default : sampleSize);
  const designSummary =
    config.kind === 'themes'
      ? sampleText
      : t.designSummary(
          config.kind === 'two-groups' ? t.perGroup(sampleSize) : t.participants(sampleSize),
          t.effects[effect],
        );

  const insight = (() => {
    if (!result) return '';
    if (result.kind === 'two-groups') {
      return t.results.insightTwoGroups({
        treatment: text.groups[1],
        control: text.groups[0],
        diff: fmt.number(Math.abs(result.test.diff)),
        higher: result.test.diff > 0,
        d: fmt.number(result.d, 2),
        size: t.sizes[effectSizeLabel(result.d)],
        significant: result.test.p < 0.05,
      });
    }
    if (result.kind === 'correlation') {
      return t.results.insightCorrelation({
        r: fmt.number(result.r, 2),
        strength: t.sizes[correlationLabel(result.r)],
        negative: result.r < 0,
        significant: result.p < 0.05,
      });
    }
    return text.keyInsight;
  })();

  const heading = (label) => (
    <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-ink-900 focus:outline-none md:text-3xl">
      {label}
    </h3>
  );

  return (
    <Panel>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-ink-900">{t.title}</h2>
          <p className="mx-auto mt-2 max-w-3xl text-gray-800">{t.intro}</p>
        </div>

        <ol aria-label={t.progress} className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
          {t.phases.map((label, index) => (
            <li
              key={label}
              aria-current={step === index + 1 ? 'step' : undefined}
              className={`rounded-full px-4 py-2 ${
                step >= index + 1 ? 'bg-primary-400 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {index + 1}. {label}
            </li>
          ))}
        </ol>

        {step === 1 && (
          <div className="animate-fade-in-up space-y-6">
            <div className="sr-only">{heading(t.phases[0])}</div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {cases.map((researchCase) => (
                <button
                  key={researchCase.id}
                  type="button"
                  onClick={() => selectScenario(researchCase.id)}
                  aria-pressed={researchCase.id === caseId}
                  className={`rounded-card border p-5 text-left transition-all ${
                    researchCase.id === caseId
                      ? 'border-primary-300/85 bg-primary-400/8 shadow-card'
                      : 'border-gray-300 bg-white hover:border-primary-300/85 hover:bg-white'
                  }`}
                >
                  <span className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                      {researchCase.method}
                    </span>
                    <span className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-800">
                      {researchCase.area}
                    </span>
                  </span>
                  <span className="mb-2 block text-lg font-semibold text-ink-900">{researchCase.title}</span>
                  <span className="mb-4 block text-sm leading-relaxed text-gray-800">{researchCase.scenario}</span>
                  <span className="block text-sm font-medium text-primary-400">{researchCase.hook}</span>
                </button>
              ))}
            </div>

            <div className="rounded-card bg-primary-500 grid-lines p-6 text-white shadow-card-lg">
              <p className={`${sectionLabel} text-white`}>{t.selectedCase}</p>
              <p className="mb-3 text-2xl font-semibold">{selectedCase.title}</p>
              <p className="text-sm leading-relaxed text-white">{selectedCase.question}</p>
              <button
                type="button"
                onClick={() => goTo(2)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-card bg-primary-400 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-400"
              >
                {t.buildDesign}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up space-y-6">
            <div className="rounded-card bg-primary-500 grid-lines p-6 text-white shadow-card-lg md:p-8">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className={`${sectionLabel} text-white`}>{t.designTitle}</p>
                  <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold focus:outline-none md:text-3xl">
                    {selectedCase.title}
                  </h3>
                </div>
                <span className="inline-flex w-fit rounded-full border border-primary-300/85 bg-primary-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {selectedCase.method}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CaseInfoCard icon={Target} label={t.objective} text={text.objective} />
                <CaseInfoCard icon={Lightbulb} label={text.focusLabel} text={text.focus} />
                <CaseInfoCard icon={Users} label={t.sample} text={sampleText} />
                <CaseInfoCard icon={ClipboardList} label={t.procedure} text={text.procedure} />
              </div>
            </div>

            <fieldset className="rounded-card border border-primary-300/85 bg-primary-400/8 p-6">
              <legend className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-lg font-semibold text-ink-900 shadow-card-sm">
                <SlidersHorizontal size={20} className="text-primary-400" />
                {t.designDecisions}
              </legend>
              {quantitative ? (
                <div className="mt-2 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <label htmlFor="sim-sample-size" className="block font-medium text-ink-900">
                      {t.sampleSizeLabel}:{' '}
                      <span className="text-primary-500">
                        {config.kind === 'two-groups' ? t.perGroup(sampleSize) : t.participants(sampleSize)}
                      </span>
                    </label>
                    <input
                      id="sim-sample-size"
                      type="range"
                      min={config.sampleSize.min}
                      max={config.sampleSize.max}
                      step={config.sampleSize.step}
                      value={sampleSize}
                      onChange={(event) => setSampleSize(Number(event.target.value))}
                      aria-describedby="sim-sample-size-help"
                      className="mt-3 w-full accent-primary-500"
                    />
                    <p id="sim-sample-size-help" className="mt-2 text-sm text-gray-800">
                      {t.sampleSizeHelp}
                    </p>
                  </div>
                  <fieldset>
                    <legend className="font-medium text-ink-900">{t.effectLabel}</legend>
                    <p className="mt-1 text-sm text-gray-800">{t.effectHelp}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {EFFECT_LEVELS.map((level) => (
                        <label
                          key={level}
                          className={`flex cursor-pointer flex-col items-center rounded-card border px-2 py-2 text-center text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-primary-500 ${
                            effect === level
                              ? 'border-primary-500 bg-primary-500 text-white'
                              : 'border-primary-300/85 bg-white text-ink-900 hover:bg-primary-400/12'
                          }`}
                        >
                          <input
                            type="radio"
                            name="sim-effect"
                            value={level}
                            checked={effect === level}
                            onChange={() => setEffect(level)}
                            className="sr-only"
                          />
                          <span className="font-semibold">{t.effects[level]}</span>
                          <span className="text-xs">
                            {config.kind === 'correlation'
                              ? t.effectRho(fmt.number(effectValue(caseId, level), 1))
                              : t.effectD(fmt.number(effectValue(caseId, level), 1))}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-ink-900">{t.qualitativeSample}</p>
              )}
            </fieldset>

            <div className="rounded-card border border-gray-300 bg-white p-6 shadow-card-sm">
              <div className="mb-4 flex items-center gap-2">
                <Layers size={22} className="text-primary-400" />
                <h4 className="text-lg font-semibold text-ink-900">{t.varsTitle}</h4>
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
                onClick={() => goTo(1)}
                className="flex w-full items-center justify-center gap-2 rounded-card border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-800 transition-colors hover:bg-white"
              >
                <RotateCcw size={18} />
                {t.changeCase}
              </button>
              <button
                type="button"
                onClick={() => goTo(3)}
                className="flex w-full items-center justify-center gap-2 rounded-card bg-primary-400 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-500"
              >
                {t.toExecution}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up rounded-card border border-primary-300/45 bg-primary-400/8 p-8 text-center">
            <FlaskConical
              size={68}
              className={`mx-auto mb-6 text-primary-400 ${running ? 'motion-safe:animate-bounce' : ''}`}
            />
            <p className={`${sectionLabel} text-primary-500`}>{selectedCase.method}</p>
            {heading(text.executionLabel)}
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-800">{text.executionText}</p>

            <div className="mx-auto mt-6 max-w-xl space-y-3 rounded-card border border-white/60 bg-white/80 p-4 text-left shadow-card-sm">
              <div>
                <p className={`${sectionLabel} text-gray-800`}>{t.studyQuestion}</p>
                <p className="text-sm leading-relaxed text-ink-900">{selectedCase.question}</p>
              </div>
              <div>
                <p className={`${sectionLabel} text-gray-800`}>{t.designDecisions}</p>
                <p className="text-sm leading-relaxed text-ink-900">{designSummary}</p>
              </div>
            </div>

            <div role="status" className="mt-8">
              {!running ? (
                <button
                  type="button"
                  onClick={execute}
                  className="mx-auto flex items-center justify-center gap-3 rounded-card bg-primary-500 px-8 py-4 font-semibold text-white shadow-card transition-all hover:bg-primary-500"
                >
                  <Play size={22} />
                  {t.run}
                </button>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full border-4 border-primary-300/85 border-t-primary-500 motion-safe:animate-spin" />
                  <p className="mt-4 text-sm font-medium text-gray-800">{t.running}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div className="animate-fade-in-up space-y-6">
            <div className="rounded-card border border-primary-300/45 bg-primary-400/8 p-6 shadow-card-sm">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className={`${sectionLabel} text-primary-500`}>{t.findings}</p>
                  {heading(selectedCase.title)}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-500 shadow-card-sm">
                    {t.sampleNumber(result.seed)}
                  </span>
                  <button
                    type="button"
                    onClick={drawSample}
                    className="flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-500"
                  >
                    <Dices size={16} />
                    {t.newSample}
                  </button>
                </div>
              </div>
              <p className="mb-5 text-sm text-gray-800">{designSummary}</p>

              <div aria-live="polite">
                {result.kind === 'two-groups' && <TwoGroupResults result={result} text={text} t={t} fmt={fmt} />}
                {result.kind === 'correlation' && <CorrelationResults result={result} text={text} t={t} fmt={fmt} />}
                {result.kind === 'themes' && <ThemeResults result={result} text={text} t={t} />}
              </div>

              {text.secondaryFindings && (
                <div className="mt-5 rounded-card border border-primary-300/85 bg-white p-5">
                  <p className={`${sectionLabel} text-primary-500`}>{text.secondaryTitle}</p>
                  <ul className="space-y-3">
                    {text.secondaryFindings.map((finding) => (
                      <li
                        key={finding}
                        className="rounded-card border border-primary-300/85 bg-primary-400/8 px-4 py-3 text-sm leading-relaxed text-ink-900"
                      >
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {quantitative && (
              <ReplicationPanel
                key={`${caseId}-${sampleSize}-${effect}`}
                caseId={caseId}
                sampleSize={sampleSize}
                effect={effect}
                result={result}
                t={t}
                fmt={fmt}
              />
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-card bg-primary-500 grid-lines p-6 text-white shadow-card-lg">
                <p className={`${sectionLabel} text-white`}>{t.reading}</p>
                <div className="space-y-4 text-sm leading-relaxed text-white">
                  <div>
                    <p className="mb-1 font-medium text-white">{t.keyInsight}</p>
                    <p>{insight}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-white">{t.discussion}</p>
                    <p>{text.discussion}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-card border border-gray-300 bg-white p-6 shadow-card-sm">
                <p className={`${sectionLabel} text-gray-800`}>{t.closing}</p>
                <div className="space-y-4 text-sm leading-relaxed text-gray-800">
                  <div>
                    <p className="mb-1 font-medium text-ink-900">{t.limitation}</p>
                    <p>{text.limitation}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-ink-900">{t.communication}</p>
                    <p>{text.communication}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row">
              <button
                type="button"
                onClick={() => goTo(2)}
                className="flex w-full items-center justify-center gap-2 rounded-card border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-800 transition-colors hover:bg-white"
              >
                <SlidersHorizontal size={18} />
                {t.adjustDesign}
              </button>
              <button
                type="button"
                onClick={() => onUseCase(selectedCase.id)}
                className="flex w-full items-center justify-center gap-2 rounded-card bg-primary-400 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-500"
              >
                {t.toAi}
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={resetSimulation}
                className="flex w-full items-center justify-center gap-2 rounded-card bg-primary-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-500"
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
