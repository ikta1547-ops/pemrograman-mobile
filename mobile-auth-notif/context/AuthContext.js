import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { getMe, loginUser } from '../services/authService';

export const AuthContext = createContext(null);
const TOKEN_KEY = 'access_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const saved = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!saved) {
        setLoading(false);
        return;
      }
      const me = await getMe(saved);
      setToken(saved);
      setUser(me);
    } catch {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email, password) {
    const data = await loginUser(email, password);
    await SecureStore.setItemAsync(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
  }

  async function signOut() {
    try {
      // Hapus token paksa dari SecureStore
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (e) {
      console.log('Gagal hapus token:', e);
    } finally {
      // Paksa reset state jadi null agar langsung mental ke halaman login
      setToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{ token, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: null, token: null, loading: true, 
      signIn: () => {

    }, 
    signOut: () => {
      loading: false
      alert('Anda belum login. Silakan login terlebih dahulu.');
    } };
  }
  return context;
}