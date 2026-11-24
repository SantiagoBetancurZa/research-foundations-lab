import { useRef } from 'react';

// WAI-ARIA tabs pattern: one Tab stop for the list, arrow keys / Home / End move between tabs.
export default function TabList({ tabs, activeId, onChange, label }) {
  const refs = useRef({});

  const activate = (index) => {
    const tab = tabs[(index + tabs.length) % tabs.length];
    onChange(tab.id);
    refs.current[tab.id]?.focus();
  };

  const handleKeyDown = (event, index) => {
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    activate(moves[event.key]);
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="thin-scrollbar flex overflow-x-auto border-b border-gray-200 pt-1"
    >
      {tabs.map((tab, index) => {
        const active = tab.id === activeId;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            ref={(element) => {
              refs.current[tab.id] = element;
            }}
            id={`tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`flex shrink-0 items-center gap-2 rounded-t-lg px-3 py-3 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
              active
                ? 'border-t-2 border-indigo-600 bg-white text-indigo-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon size={20} />
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
