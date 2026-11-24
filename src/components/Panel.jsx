export default function Panel({ children }) {
  return (
    <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}
