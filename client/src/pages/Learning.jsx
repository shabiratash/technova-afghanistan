import { useEffect, useState } from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';

export default function Learning() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses')
      .then(({ data }) => setCourses(data.items || []))
      .catch(() => setCourses([]));
  }, []);

  async function enroll(course) {
    await api.post(`/courses/${course._id}/enroll`);
  }

  return (
    <div className="grid gap-6">
      <section className="glass-panel rounded-lg p-6">
        <div className="flex items-center gap-2">
          <BookOpen className="text-amber-700 dark:text-amber-300" size={20} />
          <h1 className="text-2xl font-black">Learning center</h1>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Browse courses, inspect details and enroll through protected API routes.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.length ? courses.map((course) => (
          <article key={course._id} className="glass-panel rounded-lg p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">{course.level} · {course.category}</p>
            <h2 className="mt-3 text-lg font-black">{course.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{course.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-bold">{course.price ? `$${course.price}` : 'Free'}</span>
              {user && (
                <button type="button" onClick={() => enroll(course)} className="btn-primary px-3">
                  <CheckCircle size={16} /> Enroll
                </button>
              )}
            </div>
          </article>
        )) : (
          <div className="glass-panel rounded-lg p-6 md:col-span-2 xl:col-span-3">
            <p className="text-slate-600 dark:text-slate-300">No courses loaded yet. Add courses from the API as a provider or admin.</p>
          </div>
        )}
      </section>
    </div>
  );
}
