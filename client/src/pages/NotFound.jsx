import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg glass-panel rounded-lg p-6 text-center">
      <h1 className="text-3xl font-black">Page not found</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">The route does not exist in TechNova Afghanistan.</p>
      <Link className="btn-primary mt-6" to="/">Go home</Link>
    </section>
  );
}
