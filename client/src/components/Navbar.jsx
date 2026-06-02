import { Link, NavLink } from 'react-router-dom';
import { Briefcase, GraduationCap, LayoutDashboard, LogOut, Moon, Sun, UserRound, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const navItems = [
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/learning', label: 'Learning', icon: GraduationCap }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggleDark } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-white/30 bg-white/65 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-lg font-black text-emerald-300 dark:bg-emerald-400 dark:text-slate-950">
            TN
          </span>
          <span>
            <span className="block text-base font-black leading-tight">TechNova Afghanistan</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Services, learning, jobs</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `btn-muted px-3 ${isActive ? 'border-emerald-400 text-emerald-700 dark:text-emerald-300' : ''}`}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className="btn-muted px-3">
              <LayoutDashboard size={16} aria-hidden="true" />
              Admin
            </NavLink>
          )}
          <button type="button" onClick={toggleDark} className="btn-muted px-3" title="Toggle dark mode">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {user ? (
            <>
              <Link to="/profile" className="btn-primary px-3">
                <UserRound size={16} aria-hidden="true" />
                {user.name.split(' ')[0]}
              </Link>
              <button type="button" onClick={logout} className="btn-muted px-3" title="Log out">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
