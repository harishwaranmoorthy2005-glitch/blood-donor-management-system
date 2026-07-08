import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Search, AlertTriangle, Bell, UserCircle, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/donors', label: 'Search Donors', icon: Search },
  { to: '/emergency', label: 'Emergency', icon: AlertTriangle },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/profile', label: 'Profile', icon: UserCircle }
];

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-800 bg-slate-900/80 p-4 backdrop-blur lg:w-72 lg:border-b-0 lg:border-r lg:min-h-screen">
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-sm font-semibold text-red-300">College Blood Donor Portal</p>
            <p className="text-xs text-slate-400">Secure donor coordination</p>
          </div>
          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
            {user?.role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <Shield size={18} />
                Admin
              </NavLink>
            )}
          </nav>
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-800/80 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 text-xl font-bold text-white shadow-lg shadow-red-500/20 sm:h-15 sm:w-15">{user?.name?.[0]}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{user?.name}</p>
                <p className="truncate text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>
            <button onClick={logout} className="mt-4 flex items-center gap-2 rounded-xl bg-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-600">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>
        <main className="flex-1 p-4 lg:p-8">
          <header className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-red-300">College Blood Donor Portal</p>
              <h2 className="text-xl font-semibold">Welcome back, {user?.name}</h2>
            </div>
            <div />
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
