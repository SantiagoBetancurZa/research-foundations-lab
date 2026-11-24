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

const number = (index) => String(index + 1).padStart(2, '0');

// Front of a flashcard: number, optional icon as the illustration, and the term.
function CardFront({ index, icon: Icon, term }) {
  return (
    <>
      <span className="eyebrow text-primary-400">{number(index)}</span>
      {Icon && <Icon size={44} strokeWidth={1.5} className="mt-4 text-primary-400" />}
      <span className="mt-4 block text-lg font-medium uppercase tracking-wide text-ink-900">{term}</span>
    </>
  );
}

// Back of a flashcard: the term as a label and the definition, on the blue grid.
function CardBack({ index, term, text }) {
  return (
    <>
      <span className="eyebrow mb-3 block border-b-2 border-white/45 pb-2 text-white">
        {number(index)} · {term}
      </span>
      <span className="block text-base leading-relaxed text-white">{text}</span>
    </>
  );
}

function CardGrid({ title, intro, items, columns, renderCard }) {
  const { ui } = useLanguage();
  const state = useFlipState(items);
  return (
    <Panel>
      <h2 className="mb-2 text-center text-3xl font-medium text-ink-900">{title}</h2>
      <p className="mx-auto mb-5 max-w-3xl text-center text-gray-800">{intro}</p>
      <div className="mb-8 flex justify-center">
        <button
          type="button"
          onClick={state.toggleAll}
          className="press inline-flex items-center gap-2 rounded-card border-2 border-primary-300/85 bg-white px-4 py-2 text-sm font-medium text-primary-500 shadow-card-sm"
        >
          {state.allFlipped ? <EyeOff size={16} /> : <Eye size={16} />}
          {state.allFlipped ? ui.common.hideAll : ui.common.revealAll}
        </button>
      </div>
      <ul className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${columns}`}>
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
      renderCard={(step, index, cardProps) => (
        <FlipCard
          {...cardProps}
          front={<CardFront index={index} icon={step.icon} term={step.title} />}
          back={<CardBack index={index} term={step.title} text={step.desc} />}
        />
      )}
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
          front={<CardFront index={index} term={concept.term} />}
          back={<CardBack index={index} term={concept.term} text={concept.definition} />}
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
      renderCard={(method, index, cardProps) => (
        <FlipCard
          {...cardProps}
          front={<CardFront index={index} icon={method.icon} term={method.term} />}
          back={<CardBack index={index} term={method.term} text={method.definition} />}
        />
      )}
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
      renderCard={(instrument, index, cardProps) => (
        <FlipCard
          {...cardProps}
          front={<CardFront index={index} icon={instrument.icon} term={instrument.term} />}
          back={<CardBack index={index} term={instrument.term} text={instrument.definition} />}
        />
      )}
    />
  );
}
