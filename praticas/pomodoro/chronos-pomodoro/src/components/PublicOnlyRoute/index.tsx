import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext/index';

export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return <>{children}</>;
}