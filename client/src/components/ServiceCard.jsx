export default function ServiceCard({ service }) {
  return (
    <article className="glass-panel rounded-lg p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">{service.category}</p>
          <h3 className="mt-2 text-lg font-black">{service.title}</h3>
        </div>
        <span className="rounded-lg bg-slate-950 px-3 py-1 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
          ${service.price}
        </span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(service.tags || []).slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md bg-white/70 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
