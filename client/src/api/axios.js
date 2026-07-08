import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[auth-debug] request includes token', { url: config.url });
  } else {
    console.log('[auth-debug] request without token', { url: config.url });
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const method = response.config?.method?.toLowerCase();
    const url = response.config?.url || '';
    const isMutatingDashboardResource = ['post', 'put', 'delete'].includes(method) && /\/api\/(donors|emergency-requests)(\/|$)/.test(url);

    if (response.status >= 200 && response.status < 300 && isMutatingDashboardResource && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dashboard:refresh'));
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
