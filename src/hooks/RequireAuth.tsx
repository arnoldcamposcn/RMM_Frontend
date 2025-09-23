import React from "react";
import { useAuth } from "./useAuth";

interface RequireAuthProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, fallback = null }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <>{fallback}</>;

  return <>{children}</>;
};

export default RequireAuth;