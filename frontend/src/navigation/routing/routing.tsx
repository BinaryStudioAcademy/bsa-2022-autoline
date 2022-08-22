import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app';
import { ForgotPassword } from '@components/forgot-password/forgot-password';
import { MailVerificationFailed } from '@components/mail-verification/verification-failed/MailVerificationFailed';
import { Success } from '@components/mail-verification/verification-success/success';
import { PersonalPage } from '@components/personal-page/personal-page';
import { ResetPassword } from '@components/reset-password/reset-password';
import { Sign } from '@components/sign/sign';
import { ProtectedRoute } from '@navigation/protected-route/protected-route';

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
          <Route
            path={AppRoute.MAIL_SUCCESS_VALIDATION}
            element={<Success />}
          />
          <Route
            path={AppRoute.MAIL_FAILED_VALIDATION}
            element={<MailVerificationFailed />}
          />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.ROOT} element={<h2>Home page</h2>} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.PERSONAL} element={<PersonalPage />} />
        </Route>
        <Route path={AppRoute.NOT_FOUND} element={<h2>Not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
