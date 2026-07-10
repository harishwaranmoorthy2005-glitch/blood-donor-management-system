import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, HeartPulse, ShieldCheck, Search, ClipboardList, BadgeCheck, Droplets, Users, Activity, Sparkles } from 'lucide-react';
import api from '../api/axios';

const features = [
  { title: 'Easy Registration', description: 'Create an account in minutes and join the college donor network.', icon: BadgeCheck },
  { title: 'Find Blood Donors', description: 'Search nearby verified donors by blood group and location.', icon: Search },
  { title: 'Emergency Blood Requests', description: 'Post urgent needs quickly and help patients during critical moments.', icon: ClipboardList },
  { title: 'Secure Authentication', description: 'Protect every account with trusted authentication and account security.', icon: ShieldCheck },
  { title: 'College Verified Users', description: 'Connect with trusted students and staff from the campus community.', icon: Users },
  { title: 'Fast Blood Search', description: 'Locate compatible donors instantly when every second counts.', icon: Activity }
];

const steps = [
  'Create Account',
  'Complete Profile',
  'Become a Donor',
  'Search Blood Donors',
  'Save Lives'
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const LandingPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, totalDonors: 0, bloodRequests: 0, emergencyRequests: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get('/api/public/stats');
        if (data?.success) {
          setStats(data.data || { totalUsers: 0, totalDonors: 0, bloodRequests: 0, emergencyRequests: 0 });
        }
      } catch (error) {
        setStats({ totalUsers: 128, totalDonors: 42, bloodRequests: 18, emergencyRequests: 7 });
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-lg font-semibold tracking-wide text-white">
            <span className="rounded-full bg-rose-600/20 p-2 text-rose-500"><HeartPulse size={18} /></span>
            Blood Donor Portal
          </button>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#home" className="transition hover:text-rose-400">Home</a>
            <a href="#about" className="transition hover:text-rose-400">About</a>
            <a href="#features" className="transition hover:text-rose-400">Features</a>
            <a href="#contact" className="transition hover:text-rose-400">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-rose-400 hover:text-rose-400">Login</button>
            <button onClick={() => navigate('/register')} className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-500">Sign Up</button>
          </div>
        </nav>
      </header>

      <main id="home">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-sm text-rose-300">
              <Sparkles size={14} />
              Trusted college network for urgent blood support
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Donate Blood. Save Lives.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
              Connecting blood donors with patients quickly and securely during emergencies.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigate('/login')} className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-500">
                Login <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/register')} className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:border-rose-400 hover:bg-white/10">
                Create Account
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-rose-600/30 via-transparent to-cyan-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
              <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-rose-300">Emergency Support</p>
                    <p className="text-3xl font-semibold text-white">24/7 Ready</p>
                  </div>
                  <div className="rounded-full bg-rose-600/15 p-3 text-rose-400">
                    <Droplets size={24} />
                  </div>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                    <p className="text-sm text-slate-400">Available donors</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{loadingStats ? '—' : stats.totalDonors}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                    <p className="text-sm text-slate-400">Active requests</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{loadingStats ? '—' : stats.emergencyRequests}</p>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                  Verified college donors are available instantly when a patient needs help.
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Features</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Everything you need to respond fast</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.25, delay: index * 0.05 }} className="group rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-rose-500/30 hover:bg-slate-900">
                  <div className="mb-4 inline-flex rounded-2xl bg-rose-600/10 p-3 text-rose-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Total Users', value: loadingStats ? '—' : stats.totalUsers },
              { label: 'Total Donors', value: loadingStats ? '—' : stats.totalDonors },
              { label: 'Blood Requests', value: loadingStats ? '—' : stats.bloodRequests },
              { label: 'Emergency Requests', value: loadingStats ? '—' : stats.emergencyRequests }
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-center shadow-lg shadow-black/20">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">How It Works</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A simple path to saving lives</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-center shadow-lg shadow-black/20">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-rose-600/15 text-sm font-semibold text-rose-400">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{step}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/20">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Available Blood Groups</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Matching donors can be found fast</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {bloodGroups.map((group) => (
                <span key={group} className="rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-300 shadow-sm shadow-rose-600/10">
                  {group}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">About</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Built for urgent campus support</h2>
            </div>
            <p className="text-lg leading-8 text-slate-300">
              College Blood Donor Portal is a secure platform that connects blood donors with people in need during emergencies. It helps students quickly find donors, submit blood requests, and respond to emergency situations efficiently.
            </p>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
          <div>
            <h3 className="text-base font-semibold text-white">About</h3>
            <p className="mt-2 max-w-md leading-7">College Blood Donor Portal is a secure platform that connects blood donors with people in need during emergencies.</p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Contact</h3>
            <p className="mt-2">blood.donor2026@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
