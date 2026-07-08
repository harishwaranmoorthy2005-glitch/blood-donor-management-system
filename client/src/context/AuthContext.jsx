import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const cacheUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const setWelcomeFlag = (isNewUser) => {
    if (isNewUser) {
      localStorage.setItem('showWelcomeMessage', 'true');
    } else {
      localStorage.removeItem('showWelcomeMessage');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const cachedUser = localStorage.getItem('user');

    if (!token) {
      console.log('[auth-debug] no token in localStorage');
      setLoading(false);
      return;
    }

    console.log('[auth-debug] validating stored token on refresh');
    api.get('/auth/me')
      .then((res) => {
        console.log('[auth-debug] /auth/me success', res.data.data.user);
        cacheUser(res.data.data.user);
      })
      .catch((error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message || error?.message;
        console.warn('[auth-debug] /auth/me failed', { status, message });

        if (status === 429) {
          if (cachedUser) {
            console.warn('[auth-debug] using cached user after rate limit');
            setUser(JSON.parse(cachedUser));
          } else {
            console.warn('[auth-debug] no cached user available after rate limit');
          }
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const updateUser = (updatedUser) => {
    cacheUser(updatedUser);
  };

  const login = async (email, password) => {
    try {
      const normalizedEmail = (email || '').trim().toLowerCase();
      console.log('[auth-debug] login request', { email: normalizedEmail });
      const res = await api.post('/auth/login', { email: normalizedEmail, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.data.token);
        cacheUser(res.data.data.user);
        setWelcomeFlag(res.data.data.isNewUser || false);
        toast.success('Login successful');
        console.log('[auth-debug] login success stored token and user');
      }
      return res.data;
    } catch (error) {
      const status = error?.response?.status;
      const message = status === 429
        ? 'Too many requests. Please try again later.'
        : error?.response?.data?.message || 'Invalid email or password';
      console.warn('[auth-debug] login failed', { status, message });
      return { success: false, message };
    }
  };

  const register = async (payload) => {
    const normalizedPayload = {
      ...payload,
      email: (payload?.email || '').trim().toLowerCase()
    };
    console.log('[auth-debug] register request', { email: normalizedPayload.email });
    const res = await api.post('/auth/register', normalizedPayload);
    if (res.data.success) {
      localStorage.setItem('token', res.data.data.token);
      cacheUser(res.data.data.user);
      setWelcomeFlag(res.data.data.isNewUser || true);
      toast.success('Registration successful');
      console.log('[auth-debug] register success stored token and user');
    }
    return res.data;
  };

  const logout = () => {
    console.log('[auth-debug] logout request');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('showWelcomeMessage');
    setUser(null);
    toast.success('Logged out');
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
