export default function SettingsPage() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-2 text-sm text-slate-400">Manage notification preferences, security, and donor visibility.</p>
      <div className="mt-6 space-y-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">Email notifications enabled</div>
        <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">Two-factor authentication ready</div>
        <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">Profile visibility set to public</div>
        <div className="rounded-2xl border border-slate-800 bg-slate-800/70 p-4">Redis caching and BullMQ jobs active</div>
      </div>
    </div>
  );
}
