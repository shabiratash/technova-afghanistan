import { useEffect, useState } from 'react';
import api from '../services/api';
import StatCard from '../components/StatCard.jsx';

export default function Admin() {
  const [analytics, setAnalytics] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([api.get('/admin/analytics'), api.get('/admin/users')])
      .then(([stats, userData]) => {
        setAnalytics(stats.data);
        setUsers(userData.data.users || []);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Users" value={analytics.users || 0} tone="emerald" />
        <StatCard label="Services" value={analytics.services || 0} tone="sky" />
        <StatCard label="Jobs" value={analytics.jobs || 0} tone="amber" />
        <StatCard label="Courses" value={analytics.courses || 0} tone="rose" />
        <StatCard label="Open jobs" value={analytics.openJobs || 0} tone="emerald" />
      </section>

      <section className="glass-panel overflow-hidden rounded-lg">
        <div className="border-b border-slate-200 p-5 dark:border-white/10">
          <h1 className="text-2xl font-black">Admin dashboard</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/60 text-slate-500 dark:bg-white/5 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-slate-100 dark:border-white/10">
                  <td className="px-5 py-3 font-semibold">{user.name}</td>
                  <td className="px-5 py-3">{user.email}</td>
                  <td className="px-5 py-3 capitalize">{user.role}</td>
                  <td className="px-5 py-3">{user.isActive ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
