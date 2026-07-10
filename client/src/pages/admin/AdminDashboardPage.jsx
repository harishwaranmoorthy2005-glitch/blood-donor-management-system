import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, ClipboardList, ShieldCheck } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import adminApi from '../../api/adminAxios.js';

const statCards = [
  { key: 'totalUsers', label: 'Total Users', icon: Users, accent: 'from-red-500 to-orange-400' },
  { key: 'totalDonors', label: 'Total Donors', icon: HeartHandshake, accent: 'from-sky-500 to-indigo-500' },
  { key: 'totalBloodRequests', label: 'Total Blood Requests', icon: ClipboardList, accent: 'from-emerald-500 to-lime-500' }
];

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await adminApi.get('/api/admin/dashboard');
        setDashboard(res.data?.data || null);
      } catch {
        setDashboard(null);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
    const intervalId = window.setInterval(() => {
      loadDashboard();
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300">Loading admin dashboard...</div>;
  }

  const bloodRequestTotal = dashboard?.emergencyByStatus?.reduce((sum, item) => sum + (item.count || 0), 0) ?? dashboard?.emergencyRequests ?? 0;

  return (
    <div className="w-full min-w-0 space-y-4 overflow-x-hidden sm:space-y-6">
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl sm:p-6">
        <p className="text-sm text-red-300">Administrative control center</p>
        <h1 className="text-2xl font-semibold">Admin dashboard</h1>
      </div>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((item, index) => {
          const Icon = item.icon;
          const value = item.key === 'totalBloodRequests' ? bloodRequestTotal : (dashboard?.[item.key] ?? 0);
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-5"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent}`}>
                <Icon className="text-white" size={20} />
              </div>
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{value}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">Registration trend</h2>
            <span className="text-sm text-slate-400">Last 12 months</span>
          </div>
          <div className="h-64 sm:h-72">
            {dashboard?.registrationSeries?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboard.registrationSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    label={{ value: 'Month', position: 'insideBottom', offset: -6, fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    label={{ value: 'Number of registered users', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ stroke: 'rgba(248, 113, 113, 0.35)', strokeWidth: 1 }}
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.96)', border: '1px solid rgba(248, 113, 113, 0.35)', color: '#f8fafc' }}
                    labelStyle={{ color: '#f8fafc' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: '#020617', stroke: '#ef4444' }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: '#f97316' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/40">
                <p className="text-sm text-slate-400">No registration data available.</p>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Request status</h2>
            <ShieldCheck size={18} className="text-red-400" />
          </div>
          <div className="space-y-3">
            {dashboard?.emergencyByStatus?.map((item) => (
              <div key={item._id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-800/70 px-3 py-2">
                <span className="capitalize text-slate-300">{item._id}</span>
                <span className="font-semibold text-white">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold">Recently registered users</h2>
          <div className="space-y-3">
            {(dashboard?.recentUsers || []).length > 0 ? dashboard.recentUsers.map((user) => (
              <div key={user._id} className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-800/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate font-medium">{user.name}</p>
                  <p className="break-all text-sm text-slate-400">{user.email}</p>
                </div>
                <span className="text-sm text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            )) : <p className="text-sm text-slate-400">No recent users.</p>}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent emergency requests</h2>
          <div className="space-y-3">
            {(dashboard?.recentEmergencyRequests || []).length > 0 ? dashboard.recentEmergencyRequests.map((request) => (
              <div key={request._id} className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-800/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate font-medium">{request.patient}</p>
                  <p className="break-all text-sm text-slate-400">{request.hospital} • {request.location}</p>
                </div>
                <span className="self-start rounded-full bg-red-500/20 px-3 py-1 text-sm text-red-300 sm:self-auto">{request.status}</span>
              </div>
            )) : <p className="text-sm text-slate-400">No recent emergency requests.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
