import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FlipCard from '../components/FlipCard.jsx';
import Panel from '../components/Panel.jsx';
import { useLanguage } from '../i18n/LanguageContext.js';

function useFlipState(items) {
  const [flipped, setFlipped] = useState(() => new Set());
  const allFlipped = items.length > 0 && items.every((item) => flipped.has(item.id));
  return {
    isFlipped: (id) => flipped.has(id),
    toggle: (id) =>
      setFlipped((previous) => {
        const next = new Set(previous);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      }),
    allFlipped,
    toggleAll: () => setFlipped(allFlipped ? new Set() : new Set(items.map((item) => item.id))),
  };
}

function CardGrid({ title, intro, items, columns, renderCard }) {
  const { ui } = useLanguage();
  const state = useFlipState(items);
  return (
    <Panel>
      <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">{title}</h2>
      <p className="mb-4 text-center text-gray-600">{intro}</p>
      <div className="mb-6 flex justify-center">
        <button
          type="button"
          aria-pressed={state.allFlipped}
          onClick={state.toggleAll}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-800 transition-colors hover:bg-indigo-50"
        >
          {state.allFlipped ? <EyeOff size={16} /> : <Eye size={16} />}
          {state.allFlipped ? ui.common.hideAll : ui.common.revealAll}
        </button>
      </div>
      <ul className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${columns}`}>
        {items.map((item, index) => (
          <li key={item.id}>
            {renderCard(item, index, {
              flipped: state.isFlipped(item.id),
              onToggle: () => state.toggle(item.id),
              hint: ui.common.cardHint,
            })}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function MethodTab() {
  const { ui, content } = useLanguage();
  return (
    <CardGrid
      title={ui.method.title}
      intro={ui.method.intro}
      items={content.processSteps}
      columns="lg:grid-cols-3 xl:grid-cols-4"
      renderCard={(step, index, cardProps) => {
        const Icon = step.icon;
        return (
          <FlipCard
            {...cardProps}
            frontClass="border-2 border-indigo-100 bg-indigo-50 p-6 shadow-sm group-hover:shadow-md"
            backClass="border-2 border-indigo-800 bg-indigo-700 p-6 shadow-md"
            front={
              <>
                <span className="mb-4 rounded-full bg-white p-4 text-indigo-700 shadow-sm">
                  <Icon size={32} />
                </span>
                <span className="block text-xl font-extrabold text-gray-900">
                  {String(index + 1).padStart(2, '0')}. {step.title}
                </span>
              </>
            }
            back={
              <>
                <span className="mb-3 block w-full border-b border-indigo-400 pb-2 text-lg font-bold text-white">
                  {step.title}
                </span>
                <span className="block text-sm leading-relaxed text-white">{step.desc}</span>
              </>
            }
          />
        );
      }}
    />
  );
}

export function ConceptsTab() {
  const { ui, content } = useLanguage();
  return (
    <CardGrid
      title={ui.concepts.title}
      intro={ui.concepts.intro}
      items={content.concepts}
      columns="lg:grid-cols-3"
      renderCard={(concept, index, cardProps) => (
        <FlipCard
          {...cardProps}
          frontClass={`${concept.color} border-2 p-6 shadow-sm group-hover:shadow-md`}
          backClass="border-2 border-gray-200 bg-white p-6 shadow-sm"
          front={<span className="block text-xl font-bold text-gray-900">{concept.term}</span>}
          back={
            <>
              <span className="mb-3 block text-sm font-bold uppercase tracking-wide text-gray-600">
                {concept.term}
              </span>
              <span className="block text-base leading-relaxed text-gray-800">{concept.definition}</span>
            </>
          }
        />
      )}
    />
  );
}

export function ResearchTypesTab() {
  const { ui, content } = useLanguage();
  return (
    <CardGrid
      title={ui.researchTypes.title}
      intro={ui.researchTypes.intro}
      items={content.researchTypes}
      columns="lg:grid-cols-3"
      renderCard={(method, index, cardProps) => {
        const Icon = method.icon;
        return (
          <FlipCard
            {...cardProps}
            frontClass={`${method.color} border-2 p-6 shadow-sm group-hover:shadow-md`}
            backClass={`${method.back} border-2 p-6 shadow-lg`}
            front={
              <>
                <span className="mb-4 rounded-full bg-white/80 p-4 text-gray-800 shadow-sm">
                  <Icon size={32} />
                </span>
                <span className="block text-xl font-bold text-gray-900">{method.term}</span>
              </>
            }
            back={
              <>
                <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-white">
                  {method.term}
                </span>
                <span className="block text-base font-medium leading-relaxed text-white">
                  {method.definition}
                </span>
              </>
            }
          />
        );
      }}
    />
  );
}

export function InstrumentsTab() {
  const { ui, content } = useLanguage();
  return (
    <CardGrid
      title={ui.instruments.title}
      intro={ui.instruments.intro}
      items={content.instruments}
      columns="lg:grid-cols-3"
      renderCard={(instrument, index, cardProps) => {
        const Icon = instrument.icon;
        return (
          <FlipCard
            {...cardProps}
            frontClass={`${instrument.color} border-2 p-6 shadow-sm group-hover:shadow-md`}
            backClass="border-2 border-gray-200 bg-white p-6 shadow-lg"
            front={
              <>
                <span className="mb-4 rounded-full bg-white/80 p-4 text-gray-700 shadow-sm">
                  <Icon size={32} />
                </span>
                <span className="block text-xl font-bold text-gray-900">{instrument.term}</span>
              </>
            }
            back={
              <>
                <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-gray-600">
                  {instrument.term}
                </span>
                <span className="block text-base font-medium leading-relaxed text-gray-800">
                  {instrument.definition}
                </span>
              </>
            }
          />
        );
      }}
    />
  );
}
