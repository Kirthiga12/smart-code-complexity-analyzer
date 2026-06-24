function ResultCard({ title, value }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-5 shadow-md border border-slate-700">
      <h3 className="text-sm text-slate-400 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-cyan-400">{value}</p>
    </div>
  );
}

export default ResultCard;