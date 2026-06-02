import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, GraduationCap, Newspaper, ShieldCheck, Wrench } from 'lucide-react';
import api from '../services/api';
import StatCard from '../components/StatCard.jsx';
import ChatWidget from '../components/ChatWidget.jsx';

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    api.get('/integrations/technology-news')
      .then(({ data }) => setNews(data.articles || []))
      .catch(() => setNews([]));
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <section className="glass-panel rounded-lg p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Afghanistan technology platform</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
          TechNova Afghanistan
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          A full-stack marketplace where Afghan learners, companies and technology service providers can connect through services, jobs, courses and real-time conversations.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/services" className="btn-primary">
            Explore services <ArrowRight size={16} />
          </Link>
          <Link to="/jobs" className="btn-muted">Find jobs</Link>
          <Link to="/learning" className="btn-muted">Start learning</Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <StatCard label="Services" value="CRUD" tone="emerald" />
        <StatCard label="Jobs" value="CV" tone="sky" />
        <StatCard label="Courses" value="Enroll" tone="amber" />
        <StatCard label="Security" value="JWT" tone="rose" />
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:col-span-2 xl:grid-cols-4">
        {[
          { icon: Wrench, title: 'Services Marketplace', text: 'Create, search and manage modern technology services.' },
          { icon: Briefcase, title: 'Job Portal', text: 'Employers post jobs and applicants upload CVs.' },
          { icon: GraduationCap, title: 'Learning Center', text: 'Courses and enrollment for Afghan technology learners.' },
          { icon: ShieldCheck, title: 'Production Backend', text: 'Helmet, CORS, rate limits, validation, Redis and tests.' }
        ].map(({ icon: Icon, title, text }) => (
          <article key={title} className="glass-panel rounded-lg p-5">
            <Icon className="text-emerald-700 dark:text-emerald-300" size={22} />
            <h2 className="mt-4 font-black">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
          </article>
        ))}
      </section>

      <section className="glass-panel rounded-lg p-5 lg:col-span-1">
        <div className="flex items-center gap-2">
          <Newspaper size={18} className="text-sky-700 dark:text-sky-300" />
          <h2 className="font-black">External technology feed</h2>
        </div>
        <div className="mt-4 space-y-3">
          {news.length ? news.slice(0, 5).map((item) => (
            <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className="block rounded-lg bg-white/70 p-3 text-sm font-semibold hover:text-emerald-700 dark:bg-white/10 dark:hover:text-emerald-300">
              {item.title}
            </a>
          )) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">Start the backend to load live technology headlines.</p>
          )}
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}
