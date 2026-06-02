export default function JobCard({ job, onApply }) {
  return (
    <article className="glass-panel rounded-lg p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700 dark:text-sky-300">{job.employmentType}</p>
          <h3 className="mt-2 text-lg font-black">{job.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{job.company} · {job.location}</p>
        </div>
        <span className="w-fit rounded-lg bg-amber-500/15 px-3 py-1 text-sm font-bold text-amber-700 dark:text-amber-300">
          {job.salaryRange}
        </span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{job.description}</p>
      <button type="button" onClick={() => onApply(job)} className="btn-primary mt-4">Apply</button>
    </article>
  );
}
