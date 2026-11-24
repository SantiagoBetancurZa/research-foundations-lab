import FlipCard from '../components/FlipCard.jsx';
import Panel from '../components/Panel.jsx';
import { useLanguage } from '../i18n/LanguageContext.js';

function TabIntro({ title, intro }) {
  return (
    <>
      <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">{title}</h2>
      <p className="mb-8 text-center text-gray-500">{intro}</p>
    </>
  );
}

export function MethodTab() {
  const { ui, content } = useLanguage();
  return (
    <Panel>
      <TabIntro title={ui.method.title} intro={ui.method.intro} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {content.processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <FlipCard
              key={step.id}
              frontColor="flex flex-col items-center justify-center border-2 border-indigo-100 bg-indigo-50 p-6 text-center shadow-sm hover:shadow-md"
              backColor="flex flex-col items-center justify-center overflow-y-auto border-2 border-indigo-700 bg-indigo-600 p-6 text-center shadow-md"
              frontContent={
                <>
                  <div className="mb-4 rounded-full bg-white p-4 text-indigo-600 shadow-sm">
                    <Icon size={32} />
                  </div>
                  <h3 className="mb-2 text-xl font-extrabold text-gray-900">
                    {String(index + 1).padStart(2, '0')}. {step.title}
                  </h3>
                </>
              }
              backContent={
                <div className="flex h-full flex-col justify-center">
                  <h3 className="mb-3 border-b border-indigo-400 pb-2 text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-indigo-50">{step.desc}</p>
                </div>
              }
            />
          );
        })}
      </div>
    </Panel>
  );
}

export function ConceptsTab() {
  const { ui, content } = useLanguage();
  return (
    <Panel>
      <TabIntro title={ui.concepts.title} intro={ui.concepts.intro} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.concepts.map((concept) => (
          <FlipCard
            key={concept.id}
            frontColor={`${concept.color} flex flex-col items-center justify-center border-2 p-6 text-center shadow-sm hover:shadow-md`}
            backColor="flex flex-col items-center justify-center overflow-y-auto border-2 border-gray-200 bg-white p-6 text-center shadow-sm"
            frontContent={<h3 className="text-xl font-bold text-gray-900">{concept.term}</h3>}
            backContent={
              <div className="flex h-full flex-col justify-center">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-400">
                  {concept.term}
                </h3>
                <p className="text-base leading-relaxed text-gray-800">{concept.definition}</p>
              </div>
            }
          />
        ))}
      </div>
    </Panel>
  );
}

export function ResearchTypesTab() {
  const { ui, content } = useLanguage();
  return (
    <Panel>
      <TabIntro title={ui.researchTypes.title} intro={ui.researchTypes.intro} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.researchTypes.map((method) => {
          const Icon = method.icon;
          return (
            <FlipCard
              key={method.id}
              frontColor={`${method.color} flex flex-col items-center justify-center border-2 p-6 text-center shadow-sm hover:shadow-md`}
              backColor={`${method.back} flex flex-col items-center justify-center overflow-y-auto border-2 p-6 text-center shadow-lg`}
              frontContent={
                <>
                  <div className="mb-4 rounded-full bg-white/70 p-4 text-gray-800 shadow-sm">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{method.term}</h3>
                </>
              }
              backContent={
                <div className="flex h-full flex-col justify-center">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/80">
                    {method.term}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-white">
                    {method.definition}
                  </p>
                </div>
              }
            />
          );
        })}
      </div>
    </Panel>
  );
}

export function InstrumentsTab() {
  const { ui, content } = useLanguage();
  return (
    <Panel>
      <TabIntro title={ui.instruments.title} intro={ui.instruments.intro} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.instruments.map((instrument) => {
          const Icon = instrument.icon;
          return (
            <FlipCard
              key={instrument.id}
              frontColor={`${instrument.color} flex flex-col items-center justify-center border-2 p-6 text-center shadow-sm hover:shadow-md`}
              backColor="flex flex-col items-center justify-center overflow-y-auto border-2 border-gray-200 bg-white p-6 text-center shadow-lg"
              frontContent={
                <>
                  <div className="mb-4 rounded-full bg-white/80 p-4 text-gray-700 shadow-sm">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{instrument.term}</h3>
                </>
              }
              backContent={
                <div className="flex h-full flex-col justify-center">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-400">
                    {instrument.term}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-gray-800">
                    {instrument.definition}
                  </p>
                </div>
              }
            />
          );
        })}
      </div>
    </Panel>
  );
}
