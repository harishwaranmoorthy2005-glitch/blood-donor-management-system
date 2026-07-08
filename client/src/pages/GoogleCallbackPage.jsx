import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function GoogleCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    const finishAuth = async () => {
      if (!token) {
        toast.error('Google authentication failed');
        navigate('/login', { replace: true });
        return;
      }

      localStorage.setItem('token', token);

      try {
        const res = await api.get('/auth/me');
        const user = res?.data?.data?.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        toast.success('Google sign-in successful');
        window.location.replace('/');
      } catch (error) {
        console.error('Google callback auth failed', error);
        toast.error('Google authentication failed');
        navigate('/login', { replace: true });
      }
    };

    finishAuth();
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <p className="text-sm text-slate-300">Finishing sign-in...</p>
    </div>
  );
}
