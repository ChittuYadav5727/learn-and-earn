import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { clearStoredSession, getStoredSession, saveStoredSession } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getStoredSession());
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const existingSession = getStoredSession();
      if (!existingSession?.token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        const nextSession = { ...existingSession, user };
        setSession(nextSession);
        saveStoredSession(nextSession);
      } catch (error) {
        clearStoredSession();
        setSession(null);
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrap();
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user || null,
      isAuthenticated: Boolean(session?.token),
      isBootstrapping,
      login: (nextSession) => {
        saveStoredSession(nextSession);
        setSession(nextSession);
      },
      logout: () => {
        clearStoredSession();
        setSession(null);
      },
    }),
    [isBootstrapping, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
