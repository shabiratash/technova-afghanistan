import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="glass-panel rounded-lg p-6">
      <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Profile</p>
      <h1 className="mt-3 text-3xl font-black">{user.name}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{user.email}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white/70 p-4 dark:bg-white/10">
          <p className="text-sm text-slate-500 dark:text-slate-400">Role</p>
          <p className="mt-2 font-black capitalize">{user.role}</p>
        </div>
        <div className="rounded-lg bg-white/70 p-4 dark:bg-white/10">
          <p className="text-sm text-slate-500 dark:text-slate-400">Skills</p>
          <p className="mt-2 font-black">{user.skills?.length || 0}</p>
        </div>
        <div className="rounded-lg bg-white/70 p-4 dark:bg-white/10">
          <p className="text-sm text-slate-500 dark:text-slate-400">Account</p>
          <p className="mt-2 font-black">Active</p>
        </div>
      </div>
    </section>
  );
}
