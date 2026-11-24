// Language-independent structure of the course content: ids, icons and colors.
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
  { id: 'independent-variable', color: 'bg-blue-100 border-blue-400' },
  { id: 'dependent-variable', color: 'bg-green-100 border-green-400' },
  { id: 'control-variables', color: 'bg-yellow-100 border-yellow-400' },
  { id: 'control-group', color: 'bg-purple-100 border-purple-400' },
  { id: 'bias', color: 'bg-red-100 border-red-400' },
  { id: 'correlation-causation', color: 'bg-indigo-100 border-indigo-400' },
];

export const RESEARCH_TYPES = [
  {
    id: 'quantitative',
    icon: Calculator,
    color: 'bg-blue-100 border-blue-400',
    back: 'bg-blue-700 border-blue-800',
  },
  {
    id: 'qualitative',
    icon: MessageCircle,
    color: 'bg-rose-100 border-rose-400',
    back: 'bg-rose-700 border-rose-800',
  },
  {
    id: 'mixed',
    icon: GitMerge,
    color: 'bg-purple-100 border-purple-400',
    back: 'bg-purple-700 border-purple-800',
  },
  {
    id: 'experimental',
    icon: Target,
    color: 'bg-emerald-100 border-emerald-400',
    back: 'bg-emerald-700 border-emerald-800',
  },
  {
    id: 'descriptive',
    icon: Eye,
    color: 'bg-amber-100 border-amber-400',
    back: 'bg-amber-700 border-amber-800',
  },
];

export const INSTRUMENTS = [
  { id: 'surveys', icon: Clipboard, color: 'bg-sky-100 border-sky-400' },
  { id: 'interviews', icon: Mic, color: 'bg-fuchsia-100 border-fuchsia-400' },
  { id: 'focus-groups', icon: Users, color: 'bg-orange-100 border-orange-400' },
  { id: 'observation-guide', icon: Eye, color: 'bg-teal-100 border-teal-400' },
  { id: 'lab-equipment', icon: Microscope, color: 'bg-indigo-100 border-indigo-400' },
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
