function Suggestions({ suggestions }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-cyan-400">Suggestions</h2>
      {suggestions && suggestions.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 text-slate-200">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-400">No suggestions available.</p>
      )}
    </div>
  );
}

export default Suggestions;