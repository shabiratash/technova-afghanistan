import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('technova_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('technova_user');
    return raw ? JSON.parse(raw) : null;
  });

  async function login(credentials) {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('technova_token', data.token);
    localStorage.setItem('technova_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }

  async function register(payload) {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('technova_token', data.token);
    localStorage.setItem('technova_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('technova_token');
    localStorage.removeItem('technova_user');
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({ token, user, login, register, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
