function ScoreBadge({ score }) {
  let label = "Low";
  let color = "bg-green-500";

  if (score >= 4 && score <= 7) {
    label = "Medium";
    color = "bg-yellow-500";
  } else if (score >= 8) {
    label = "High";
    color = "bg-red-500";
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-700 flex flex-col items-center justify-center">
      <h3 className="text-sm text-slate-400 mb-3">Complexity Score</h3>
      <p className="text-4xl font-bold text-white mb-3">{score}/10</p>
      <span className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${color}`}>
        {label}
      </span>
    </div>
  );
}

export default ScoreBadge;