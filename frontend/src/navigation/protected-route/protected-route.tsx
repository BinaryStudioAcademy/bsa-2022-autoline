import { ReactElement, ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '@common/enums/app/app';

/**
 * Inspired with:
 * https://www.robinwieruch.de/react-router-private-routes/ &
 * https://youtu.be/2lJuOh4YlGM
 */

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactNode;
}

const ProtectedRoute = ({
  isAllowed = false,
  redirectPath = AppRoute.SIGN_IN,
  children,
}: ProtectedRouteProps): ReactElement => {
  const location = useLocation();
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export { ProtectedRoute };
