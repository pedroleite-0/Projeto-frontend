import { useContext } from 'react';
import { AuthContext } from './AuthContext';
export * from './AuthContext';
export * from './AuthContextProvider';
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthContextProvider');
  return ctx;
}

export { AuthContextProvider } from './AuthContextProvider';