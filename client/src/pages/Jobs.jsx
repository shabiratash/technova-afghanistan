import { useEffect, useState } from 'react';
import { Briefcase, Upload } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
import JobCard from '../components/JobCard.jsx';

export default function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [cv, setCv] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    description: '',
    category: 'engineering',
    location: 'Kabul / Remote',
    salaryRange: 'Negotiable',
    employmentType: 'full-time'
  });

  async function loadJobs() {
    const { data } = await api.get('/jobs');
    setJobs(data.items || []);
  }

  useEffect(() => {
    loadJobs().catch(() => setJobs([]));
  }, []);

  async function postJob(event) {
    event.preventDefault();
    await api.post('/jobs', jobForm);
    setJobForm({ ...jobForm, title: '', description: '' });
    await loadJobs();
  }

  async function apply(event) {
    event.preventDefault();
    if (!selectedJob || !cv) return;
    const payload = new FormData();
    payload.append('cv', cv);
    payload.append('coverLetter', coverLetter);
    await api.post(`/jobs/${selectedJob._id}/apply`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
    setSelectedJob(null);
    setCv(null);
    setCoverLetter('');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="grid gap-6">
        <div className="glass-panel rounded-lg p-6">
          <div className="flex items-center gap-2">
            <Briefcase className="text-sky-700 dark:text-sky-300" size={20} />
            <h1 className="text-2xl font-black">Job portal</h1>
          </div>
          {(user?.role === 'employer' || user?.role === 'admin') && (
            <form onSubmit={postJob} className="mt-6 grid gap-3">
              <input className="field" value={jobForm.title} onChange={(event) => setJobForm({ ...jobForm, title: event.target.value })} placeholder="Job title" required />
              <input className="field" value={jobForm.company} onChange={(event) => setJobForm({ ...jobForm, company: event.target.value })} placeholder="Company" required />
              <textarea className="field min-h-28" value={jobForm.description} onChange={(event) => setJobForm({ ...jobForm, description: event.target.value })} placeholder="Description" required />
              <select className="field" value={jobForm.category} onChange={(event) => setJobForm({ ...jobForm, category: event.target.value })}>
                {['engineering', 'design', 'marketing', 'education', 'operations', 'support'].map((category) => <option key={category}>{category}</option>)}
              </select>
              <button className="btn-primary" type="submit">Post job</button>
            </form>
          )}
        </div>

        {selectedJob && (
          <form onSubmit={apply} className="glass-panel rounded-lg p-6">
            <h2 className="font-black">Apply to {selectedJob.title}</h2>
            <textarea className="field mt-4 min-h-28" value={coverLetter} onChange={(event) => setCoverLetter(event.target.value)} placeholder="Cover letter" />
            <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 p-4 text-sm font-semibold dark:border-white/20">
              <Upload size={16} />
              <span>{cv ? cv.name : 'Upload CV as PDF, DOC or DOCX'}</span>
              <input className="hidden" type="file" accept=".pdf,.doc,.docx" onChange={(event) => setCv(event.target.files[0])} required />
            </label>
            <button className="btn-primary mt-4" type="submit">Submit application</button>
          </form>
        )}
      </section>

      <section className="grid gap-4">
        {jobs.length ? jobs.map((job) => (
          <JobCard key={job._id} job={job} onApply={setSelectedJob} />
        )) : (
          <div className="glass-panel rounded-lg p-6">
            <p className="text-slate-600 dark:text-slate-300">No jobs loaded yet. Start the backend or post one as an employer.</p>
          </div>
        )}
      </section>
    </div>
  );
}
