function CodeInput({ code, setCode, language, setLanguage, handleAnalyze, loading }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-cyan-400">Paste Your Code</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none"
        >
          <option value="python">Python</option>
        </select>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your Python code here..."
        rows="16"
        className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-slate-200 outline-none resize-none font-mono"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-4 w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-xl font-semibold text-slate-950 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Code"}
      </button>
    </div>
  );
}

export default CodeInput;