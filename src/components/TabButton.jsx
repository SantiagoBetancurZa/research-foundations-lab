export default function TabButton({ active, icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 rounded-t-lg px-4 py-3 font-medium transition-colors ${
        active
          ? 'border-t-2 border-indigo-600 bg-white text-indigo-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      type="button"
    >
      <Icon size={20} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
