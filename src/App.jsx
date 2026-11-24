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
import TabButton from './components/TabButton.jsx';
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="animate-pulse rounded-2xl bg-indigo-600 p-4 text-white shadow-lg">
            <FlaskConical size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              {ui.appTitle}
            </h1>
            <p className="mt-1 text-lg text-gray-600">{ui.appTagline}</p>
          </div>
        </header>

        <div className="hide-scrollbar flex overflow-x-auto border-b border-gray-200">
          {TABS.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              icon={tab.icon}
              label={ui.tabs[tab.id]}
            />
          ))}
        </div>

        <div className="overflow-hidden rounded-b-xl rounded-tr-xl shadow-xl">
          {activeTab === 'method' && <MethodTab />}
          {activeTab === 'researchTypes' && <ResearchTypesTab />}
          {activeTab === 'instruments' && <InstrumentsTab />}
          {activeTab === 'concepts' && <ConceptsTab />}
          {activeTab === 'cases' && <CasesTab onUseCase={openCaseInAiDesigner} />}
          {activeTab === 'article' && <ArticleTab />}
          {activeTab === 'simulator' && <SimulatorTab onUseCase={openCaseInAiDesigner} />}
          {activeTab === 'ai' && (
            <AiDesignerTab
              observation={aiObservation}
              caseId={aiCaseId}
              onObservationChange={setAiObservation}
              onCaseSelect={selectAiCase}
            />
          )}
        </div>

        <div className="mt-12 text-center text-sm text-gray-400">
          <p>{ui.footer.credit}</p>
          <p className="mt-2">
            {ui.footer.visit}{' '}
            <a
              href="https://santiagobetancur.site"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-500 transition-colors hover:text-indigo-600"
            >
              santiagobetancur.site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
