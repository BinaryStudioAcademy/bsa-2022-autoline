import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app';
import { Administration } from '@components/administration';
import { ProtectedRoute } from '@navigation/protected-route/protected-route';

import { Sign } from '../../components/sign/sign';

const Routing: FC = () => {
  const authData = {
    name: 'Oleksandr',
    role: 'admin',
  };
  const { role } = authData;
  const isAdmin = role === 'admin';

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!authData}
              redirectPath={AppRoute.ROOT}
            />
          }
        >
          <Route path={AppRoute.SIGN_IN} element={<Sign />} />
          <Route path={AppRoute.SIGN_UP} element={<Sign />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.ROOT} element={<h2>Home page</h2>} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={isAdmin} />}>
          <Route path={AppRoute.ADMINISTRATION} element={<Administration />} />
        </Route>
        <Route path={AppRoute.NOT_FOUND} element={<h2>Not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
