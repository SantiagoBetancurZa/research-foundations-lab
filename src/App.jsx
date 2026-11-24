import { useState } from 'react';
import {
  BookOpen,
  ClipboardList,
  FlaskConical,
  Layers,
  Microscope,
  Sparkles,
  Target,
  TestTube,
} from 'lucide-react';
import TabList from './components/TabList.jsx';
import { useLanguage } from './i18n/LanguageContext.js';
import { ConceptsTab, InstrumentsTab, MethodTab, ResearchTypesTab } from './tabs/CardTabs.jsx';
import CasesTab from './tabs/CasesTab.jsx';
import ArticleTab from './tabs/ArticleTab.jsx';
import SimulatorTab from './tabs/SimulatorTab.jsx';
import AiDesignerTab from './tabs/AiDesignerTab.jsx';

const TABS = [
  { id: 'method', icon: Layers },
  { id: 'researchTypes', icon: Target },
  { id: 'instruments', icon: Microscope },
  { id: 'concepts', icon: BookOpen },
  { id: 'cases', icon: ClipboardList },
  { id: 'article', icon: BookOpen },
  { id: 'simulator', icon: TestTube },
  { id: 'ai', icon: Sparkles },
];

export default function App() {
  const { ui, content } = useLanguage();
  const [activeTab, setActiveTab] = useState('method');
  const [aiObservation, setAiObservation] = useState('');
  const [aiCaseId, setAiCaseId] = useState(null);

  const selectAiCase = (caseId) => {
    const researchCase = content.cases.find((item) => item.id === caseId);
    setAiCaseId(researchCase ? caseId : null);
    setAiObservation(researchCase?.seedObservation ?? '');
  };

  const openCaseInAiDesigner = (caseId) => {
    selectAiCase(caseId);
    setActiveTab('ai');
  };

  const panels = {
    method: <MethodTab />,
    researchTypes: <ResearchTypesTab />,
    instruments: <InstrumentsTab />,
    concepts: <ConceptsTab />,
    cases: <CasesTab onUseCase={openCaseInAiDesigner} />,
    article: <ArticleTab />,
    simulator: <SimulatorTab onUseCase={openCaseInAiDesigner} />,
    ai: (
      <AiDesignerTab
        observation={aiObservation}
        caseId={aiCaseId}
        onObservationChange={setAiObservation}
        onCaseSelect={selectAiCase}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-indigo-800 focus:shadow-lg"
      >
        {ui.skipToContent}
      </a>
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="rounded-2xl bg-indigo-600 p-4 text-white shadow-lg">
            <FlaskConical size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              {ui.appTitle}
            </h1>
            <p className="mt-1 text-lg text-gray-600">{ui.appTagline}</p>
          </div>
        </header>

        <main id="main" tabIndex={-1} className="focus:outline-none">
          <TabList
            label={ui.tabsLabel}
            tabs={TABS.map((tab) => ({ ...tab, label: ui.tabs[tab.id] }))}
            activeId={activeTab}
            onChange={setActiveTab}
          />
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            className="overflow-hidden rounded-b-xl rounded-tr-xl shadow-xl"
          >
            {panels[activeTab]}
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>{ui.footer.credit}</p>
          <p className="mt-2">
            {ui.footer.visit}{' '}
            <a
              href="https://santiagobetancur.site"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-700 underline underline-offset-2 transition-colors hover:text-indigo-900"
            >
              santiagobetancur.site
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
