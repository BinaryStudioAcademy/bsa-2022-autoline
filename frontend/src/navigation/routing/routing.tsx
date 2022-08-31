import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app';
import { Administration } from '@components/administration';
import { Spinner } from '@components/common/spinner/spinner';
import { ForgotPassword } from '@components/forgot-password/forgot-password';
import { LandingPage } from '@components/landing-page/landing-page';
import { MailVerificationFailed } from '@components/mail-verification/verification-failed/mail-verification-failed';
import { MailVerificationSuccess } from '@components/mail-verification/verification-success/mail-verification-success';
import { PersonalPage } from '@components/personal-page/personal-page';
import { ResetPassword } from '@components/reset-password/reset-password';
import { SearchPage } from '@components/search-page/search-page';
import { RedirectAfterSign } from '@components/sign/components/redirect-after-sign/redirect-after-sign';
import { Sign } from '@components/sign/sign';
import { useAppSelector } from '@hooks/hooks';
import { ProtectedRoute } from '@navigation/protected-route/protected-route';
import { useGetUserQuery } from '@store/queries/user/update-user';

const Routing: FC = () => {
  const { data: authData, isLoading } = useGetUserQuery();
  const isAdmin = authData?.role === 'admin';

  const userToken = useAppSelector((state) => state.auth.token);

  if (isLoading) return <Spinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute
              isAllowed={!userToken}
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
        <Route element={<ProtectedRoute isAllowed={!!userToken} />}>
          <Route path={AppRoute.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!userToken} />}>
          <Route path={AppRoute.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!userToken} />}>
          <Route path={AppRoute.ROOT} element={<LandingPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={isAdmin} />}>
          <Route path={AppRoute.ADMINISTRATION} element={<Administration />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!userToken} />}>
          <Route path={AppRoute.PERSONAL} element={<PersonalPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!userToken} />}>
          <Route path={AppRoute.SEARCH} element={<SearchPage />} />
        </Route>
        <Route path={AppRoute.NOT_FOUND} element={<h2>Not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
