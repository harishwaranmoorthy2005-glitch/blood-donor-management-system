import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, HeartHandshake, AlertTriangle, UserCircle, Bell, LogOut, Menu, X } from 'lucide-react';
import adminApi, { ADMIN_TOKEN_KEY } from '../../api/adminAxios.js';
import { useAuth } from '../../context/AuthContext.jsx';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/dashboard/users', label: 'Users', icon: Users },
  { to: '/admin/dashboard/donors', label: 'Donors', icon: HeartHandshake },
  { to: '/admin/dashboard/emergency', label: 'Emergency Requests', icon: AlertTriangle },
  { to: '/admin/dashboard/profile', label: 'Admin Profile', icon: UserCircle },
  { to: '/admin/dashboard/notifications', label: 'Notifications', icon: Bell }
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearAdminAuthSession } = useAuth();
  const [profile, setProfile] = useState({ name: 'Admin', email: '' });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await adminApi.get('/api/admin/profile');
        const nextProfile = res.data?.data || {};
        setProfile({ name: nextProfile.name || 'Admin', email: nextProfile.email || '' });
        localStorage.setItem('adminProfile', JSON.stringify(nextProfile));
      } catch {
        const cached = localStorage.getItem('adminProfile');
        if (cached) {
          try {
            setProfile(JSON.parse(cached));
          } catch {
            // ignore
          }
        }
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    clearAdminAuthSession();
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem('adminSessionVerified');
    localStorage.removeItem('adminProfile');
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem('adminSessionVerified');
    navigate('/dashboard');
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <div className="border-b border-slate-800 bg-slate-900/90 p-4 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2">
              <p className="text-sm font-semibold text-red-300">Blood Donor Admin</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="rounded-xl border border-slate-700 p-2 text-slate-200 transition hover:bg-slate-800"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileNavOpen ? <div className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden" onClick={closeMobileNav} /> : null}

        <aside className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-slate-800 bg-slate-900/95 p-4 backdrop-blur transition-transform duration-200 lg:static lg:w-72 lg:min-h-screen lg:border-b-0 lg:border-r lg:bg-slate-900/90 lg:translate-x-0 ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex items-center justify-between lg:justify-start">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm font-semibold text-red-300">Blood Donor Admin</p>
              <p className="text-xs text-slate-400">Separate administrative workspace</p>
            </div>
            <button
              type="button"
              onClick={closeMobileNav}
              className="rounded-xl p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white lg:hidden"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="mt-6 space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;

              return (
                <NavLink key={to} to={to} onClick={closeMobileNav} className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                  <Icon size={18} />
                  {label}
                </NavLink>
              );
            })}
          </nav>
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-800/80 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 font-semibold text-white">
                {profile.name?.[0] || 'A'}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium">{profile.name}</p>
                <p className="truncate text-xs text-slate-400">{profile.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="mt-4 flex items-center gap-2 rounded-xl bg-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-600">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>
        <main className="flex-1 min-w-0 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
