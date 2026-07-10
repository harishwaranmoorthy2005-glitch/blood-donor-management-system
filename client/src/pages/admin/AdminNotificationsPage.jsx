import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../api/axios.js';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const res = await api.get('/api/notifications');
      setNotifications(res.data?.data || []);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((notification) => notification._id !== id));
      await loadNotifications();
    } catch {
      // keep the existing UI behavior intact if the delete request fails
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        {notifications.length > 0 ? notifications.map((notification) => (
          <div key={notification._id} className="relative mb-3 rounded-2xl border border-slate-800 bg-slate-800/70 p-4">
            <button
              type="button"
              onClick={() => handleDelete(notification._id)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 transition hover:bg-slate-700 hover:text-red-300"
              aria-label="Delete notification"
            >
              <Trash2 size={16} />
            </button>
            <p className="pr-10 font-medium">{notification.title}</p>
            <p className="mt-1 pr-10 text-sm text-slate-400">{notification.message}</p>
          </div>
        )) : <p className="text-sm text-slate-400">No notifications yet.</p>}
      </div>
    </div>
  );
}
