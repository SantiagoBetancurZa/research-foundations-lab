export function CaseInfoCard({ icon: Icon, label, text }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-200">
        <Icon size={18} />
        <span>{label}</span>
      </div>
      <p className="text-sm leading-relaxed text-slate-100">{text}</p>
    </div>
  );
}

export function VariableCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-600">{label}</p>
      <p className="text-sm leading-relaxed text-slate-700">{value}</p>
    </div>
  );
}

export function ConceptItem({ label, val, sub }) {
  return (
    <div className="border-b border-gray-700 pb-3">
      <div className="mb-1 flex items-end justify-between">
        <span className="text-sm font-bold uppercase tracking-tight text-indigo-400">{label}</span>
        <span className="font-mono text-[10px] italic text-gray-400">{sub}</span>
      </div>
      <p className="text-sm text-gray-300">{val}</p>
    </div>
  );
}
