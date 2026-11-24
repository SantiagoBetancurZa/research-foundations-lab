import { useRef } from 'react';

// WAI-ARIA tabs pattern: one Tab stop for the list, arrow keys / Home / End move between tabs.
// Styled as chips on the blue canvas; the selected one is a white card.
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
    <div role="tablist" aria-label={label} className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
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
            className={`press flex items-center justify-center gap-2 rounded-card border-2 px-3 py-2.5 text-sm font-medium sm:text-base ${
              active
                ? 'border-white bg-white text-primary-500 shadow-deep-sm'
                : 'border-white/45 text-white hover:bg-white/10'
            }`}
          >
            <Icon size={18} strokeWidth={2} className="shrink-0" />
            <span className="text-left leading-tight sm:whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
