export default function StatCard({ label, value, tone = 'emerald' }) {
  const tones = {
    emerald: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    sky: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
    amber: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    rose: 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
  };

  return (
    <div className="glass-panel rounded-lg p-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-3 inline-flex rounded-lg px-3 py-2 text-2xl font-black ${tones[tone]}`}>{value}</p>
    </div>
  );
}
