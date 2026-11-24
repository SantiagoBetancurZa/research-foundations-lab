export function CaseInfoCard({ icon: Icon, label, text }) {
  return (
    <div className="rounded-card border border-white/15 bg-white/10 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
        <Icon size={18} />
        <span>{label}</span>
      </div>
      <p className="text-sm leading-relaxed text-white">{text}</p>
    </div>
  );
}

export function VariableCard({ label, value }) {
  return (
    <div className="rounded-card border border-gray-300 bg-white p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-800">{label}</p>
      <p className="text-sm leading-relaxed text-gray-800">{value}</p>
    </div>
  );
}

export function ConceptItem({ label, val, sub }) {
  return (
    <div className="border-b border-white/30 pb-3">
      <div className="mb-1 flex items-end justify-between">
        <span className="text-sm font-semibold uppercase tracking-tight text-white">{label}</span>
        <span className="font-mono text-[11px] italic text-white">{sub}</span>
      </div>
      <p className="text-sm text-white">{val}</p>
    </div>
  );
}
