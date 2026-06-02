import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <section className="mx-auto max-w-md glass-panel rounded-lg p-6">
      <h1 className="text-2xl font-black">Login</h1>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="label">Email</span>
          <input className="field" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        </label>
        <label className="grid gap-2">
          <span className="label">Password</span>
          <input className="field" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        </label>
        {error && <p className="rounded-lg bg-rose-500/15 p-3 text-sm font-semibold text-rose-700 dark:text-rose-300">{error}</p>}
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        New here? <Link className="font-bold text-emerald-700 dark:text-emerald-300" to="/register">Create an account</Link>
      </p>
    </section>
  );
}
