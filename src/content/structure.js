// Language-independent structure of the course content: ids and icons.
// The text for each id lives in the language files (en.js, es.js).
import {
  Search,
  HelpCircle,
  Lightbulb,
  TestTube,
  LineChart,
  CheckSquare,
  Share2,
  BookOpen,
  ClipboardList,
  Calculator,
  MessageCircle,
  GitMerge,
  Target,
  Eye,
  Clipboard,
  Mic,
  Users,
  Microscope,
} from 'lucide-react';

export const PROCESS_STEPS = [
  { id: 'observation', icon: Search },
  { id: 'question', icon: HelpCircle },
  { id: 'literature-review', icon: BookOpen },
  { id: 'objective', icon: Target },
  { id: 'hypothesis', icon: Lightbulb },
  { id: 'methodological-design', icon: ClipboardList },
  { id: 'experimentation', icon: TestTube },
  { id: 'analysis', icon: LineChart },
  { id: 'conclusion', icon: CheckSquare },
  { id: 'communication', icon: Share2 },
];

export const CONCEPTS = [
  { id: 'independent-variable' },
  { id: 'dependent-variable' },
  { id: 'control-variables' },
  { id: 'control-group' },
  { id: 'bias' },
  { id: 'correlation-causation' },
];

export const RESEARCH_TYPES = [
  { id: 'quantitative', icon: Calculator },
  { id: 'qualitative', icon: MessageCircle },
  { id: 'mixed', icon: GitMerge },
  { id: 'experimental', icon: Target },
  { id: 'descriptive', icon: Eye },
];

export const INSTRUMENTS = [
  { id: 'surveys', icon: Clipboard },
  { id: 'interviews', icon: Mic },
  { id: 'focus-groups', icon: Users },
  { id: 'observation-guide', icon: Eye },
  { id: 'lab-equipment', icon: Microscope },
];

export const CASES = [
  { id: 'music-concentration' },
  { id: 'ai-drafts' },
  { id: 'phone-sleep' },
  { id: 'online-forums' },
];

export const ARTICLE_SECTIONS = [
  { id: 'title', icon: Target },
  { id: 'abstract', icon: ClipboardList },
  { id: 'keywords', icon: Search },
  { id: 'introduction', icon: BookOpen },
  { id: 'methods', icon: TestTube },
  { id: 'results', icon: LineChart },
  { id: 'discussion', icon: MessageCircle },
  { id: 'conclusions', icon: CheckSquare },
  { id: 'references', icon: Share2 },
];
