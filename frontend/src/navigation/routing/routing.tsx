import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AppLinks } from '@common/enums/app/app';
import { ProtectedRoute } from '@navigation/protected-route/protected-route';

const Routing: FC = () => {
  const authData = { name: 'Oleksandr' };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute
              isAllowed={!authData}
              redirectPath={AppRoute.ROOT}
            />
          }
        >
          <Route path={AppRoute.SIGN_IN} element={<h2>Auth SIGN_IN</h2>} />
          <Route path={AppRoute.SIGN_UP} element={<h2>Auth SIGN_UP</h2>} />
        </Route>
        <Route
          path={AppRoute.MAIL_SACCESSFUL_VALIDATION}
          element={
            <div>
              <h2>Validation was successful</h2>
              <a rel="stylesheet" href={AppLinks.ROOT}>
                Main page
              </a>
            </div>
          }
        />
        <Route
          path={AppRoute.MAIL_FAILED_VALIDATION}
          element={
            <div>
              <h2>Validation failed</h2>
              <a rel="stylesheet" href={AppLinks.SIGN_UP}>
                Sign-up page
              </a>
            </div>
          }
        />
        <Route
          path={AppRoute.NOT_ALLOWED_SEND_MAIL}
          element={
            <div>
              <h2>Please login to receive the activation link</h2>
              <a rel="stylesheet" href={AppLinks.SIGN_IN}>
                Sign-in page
              </a>
            </div>
          }
        />
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.ROOT} element={<h2>Home page</h2>} />
        </Route>
        <Route path={AppRoute.NOT_FOUND} element={<h2>Not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
