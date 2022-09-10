import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app';
import { Administration } from '@components/administration';
import { ForgotPassword } from '@components/forgot-password/forgot-password';
import { LandingPage } from '@components/landing-page/landing-page';
import { MailVerificationFailed } from '@components/mail-verification/verification-failed/mail-verification-failed';
import { MailVerificationSuccess } from '@components/mail-verification/verification-success/mail-verification-success';
import { NotFoundPage } from '@components/not-found-page/not-found-page';
import { PersonalPage } from '@components/personal-page/personal-page';
import { ResetPassword } from '@components/reset-password/reset-password';
import { SearchPage } from '@components/search-page/search-page';
import { RedirectAfterSign } from '@components/sign/components/redirect-after-sign/redirect-after-sign';
import { Sign } from '@components/sign/sign';
import { ProtectedRoute } from '@navigation/protected-route/protected-route';
import { useGetUserQuery } from '@store/queries/user/update-user';

const Routing: FC = () => {
  const authData = {
    name: 'Oleksandr',
  };

  const { data } = useGetUserQuery();
  const role = data?.role;
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
          <Route
            path={AppRoute.MAIL_SUCCESS_VALIDATION}
            element={<MailVerificationSuccess />}
          />
          <Route
            path={AppRoute.MAIL_FAILED_VALIDATION}
            element={<MailVerificationFailed />}
          />
          <Route
            path={AppRoute.SIGN_REDIRECT}
            element={<RedirectAfterSign />}
          />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.ROOT} element={<LandingPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAllowed={isAdmin} redirectPath={AppRoute.ROOT} />
          }
        >
          <Route path={AppRoute.ADMINISTRATION} element={<Administration />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.PERSONAL} element={<PersonalPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.SEARCH} element={<SearchPage />} />
        </Route>
        <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
