import { useState } from "react";
import api from "./api/axios";
import CodeInput from "./components/CodeInput";
import ResultCard from "./components/ResultCard";
import ScoreBadge from "./components/ScoreBadge";
import Suggestions from "./components/Suggestions";

function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(`def sample():
    for i in range(10):
        if i % 2 == 0:
            print(i)`);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please paste some code before analyzing.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await api.post("/analyze", {
        language,
        code,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      setError("Failed to connect to backend. Make sure FastAPI server is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
            Smart Code Complexity Analyzer
          </h1>
          <p className="text-slate-400 mt-3 max-w-3xl">
            Analyze Python code complexity using AST parsing. Get function count,
            loop count, conditions, nesting depth, complexity score, and
            suggestions to improve maintainability.
          </p>
        </div>

        {/* Input Section */}
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          handleAnalyze={handleAnalyze}
          loading={loading}
        />

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500 text-red-300 rounded-xl p-4">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResultCard title="Functions" value={result.functions} />
              <ResultCard title="Loops" value={result.loops} />
              <ResultCard title="Conditions" value={result.conditions} />
              <ResultCard title="Nesting Depth" value={result.nesting_depth} />
              <ScoreBadge score={result.complexity_score} />
            </div>

            <Suggestions suggestions={result.suggestions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;