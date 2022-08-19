import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app';
import { MainCollapse } from '@components/collapse_component/mainCollapse';
import { Failed } from '@components/mail-verification/verification-failed/failed';
import { Success } from '@components/mail-verification/verification-success/success';
// import { NewCarCard } from '@components/new-car-card/new-car-card';
import { ProtectedRoute } from '@navigation/protected-route/protected-route';

import { Sign } from '../../components/sign/sign';

// const myprop = { lable: 'complite set', el: Collapse };

const Routing: FC = () => {
  const authData = { name: 'Oleksandr' };

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
          <Route path={'/collapse'} element={<MainCollapse />} />
          <Route
            path={AppRoute.MAIL_SUCCESS_VALIDATION}
            element={<Success />}
          />
          <Route path={AppRoute.MAIL_FAILED_VALIDATION} element={<Failed />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.ROOT} element={<h2>Home page</h2>} />
        </Route>
        <Route path={AppRoute.NOT_FOUND} element={<h2>Not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
