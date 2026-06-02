import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <section className="mx-auto max-w-lg glass-panel rounded-lg p-6">
      <h1 className="text-2xl font-black">Create account</h1>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2">
          <span className="label">Name</span>
          <input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        </label>
        <label className="grid gap-2">
          <span className="label">Email</span>
          <input className="field" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        </label>
        <label className="grid gap-2">
          <span className="label">Password</span>
          <input className="field" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        </label>
        <label className="grid gap-2">
          <span className="label">Role</span>
          <select className="field" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
            <option value="student">Student</option>
            <option value="provider">Service Provider</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        {error && <p className="rounded-lg bg-rose-500/15 p-3 text-sm font-semibold text-rose-700 dark:text-rose-300">{error}</p>}
        <button type="submit" className="btn-primary">Register</button>
      </form>
    </section>
  );
}
