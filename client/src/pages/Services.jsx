import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

const categories = ['web-development', 'mobile-apps', 'cybersecurity', 'cloud', 'ai', 'design', 'training', 'support'];

export default function Services() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'web-development',
    price: 100,
    tags: 'react, node'
  });

  async function loadServices() {
    const { data } = await api.get('/services', { params: { search, sortBy: 'createdAt' } });
    setServices(data.items || []);
  }

  useEffect(() => {
    loadServices().catch(() => setServices([]));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await api.post('/services', {
      ...form,
      price: Number(form.price),
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    });
    setForm({ ...form, title: '', description: '' });
    await loadServices();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="glass-panel rounded-lg p-6">
        <h1 className="text-2xl font-black">Services marketplace</h1>
        <div className="mt-5 flex gap-2">
          <input className="field" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search services" />
          <button type="button" onClick={loadServices} className="btn-primary px-3" title="Search">
            <Search size={16} />
          </button>
        </div>
        {user && (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
            <h2 className="font-black">Create service</h2>
            <input className="field" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Title" required />
            <textarea className="field min-h-28" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" required />
            <select className="field" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <input className="field" type="number" min="0" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} />
            <input className="field" value={form.tags} onChange={(event) => setForm({ ...form, tags: event.target.value })} placeholder="Tags separated by comma" />
            <button type="submit" className="btn-primary">
              <Plus size={16} /> Publish service
            </button>
          </form>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {services.length ? services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        )) : (
          <div className="glass-panel rounded-lg p-6 md:col-span-2">
            <p className="text-slate-600 dark:text-slate-300">No services loaded yet. Start the backend or create a new service after logging in.</p>
          </div>
        )}
      </section>
    </div>
  );
}
