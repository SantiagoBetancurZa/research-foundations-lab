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
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
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
    <div className="on-blue min-h-screen px-3 py-5 sm:px-6 md:px-10 md:py-10">
      <a
        href="#main"
        className="on-light sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-card focus:border-2 focus:border-primary-500 focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-primary-500"
      >
        {ui.skipToContent}
      </a>
      {/* The channel's frame: a 4 px white line that encloses the composition. */}
      <div className="mx-auto max-w-6xl md:border-4 md:border-white/45 md:p-8">
        <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flashcard grid size-16 shrink-0 place-items-center text-primary-400 shadow-deep-sm sm:size-20">
              <FlaskConical size={38} strokeWidth={1.75} />
            </div>
            <div className="text-white">
              <p className="eyebrow">{ui.appEyebrow}</p>
              <h1 className="mt-1 text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
                {ui.appTitle}
              </h1>
              <p className="mt-2 text-base sm:text-lg">{ui.appTagline}</p>
            </div>
          </div>
          <div className="md:ml-auto">
            <LanguageSwitcher />
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
            className="mt-5 rounded-card"
          >
            {panels[activeTab]}
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-white">
          <p>{ui.footer.credit}</p>
          <p className="mt-2">
            {ui.footer.visit}{' '}
            <a
              href="https://santiagobetancur.site"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white underline decoration-2 underline-offset-4 hover:decoration-white/60"
            >
              santiagobetancur.site
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
