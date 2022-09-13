import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app';
import { AboutPage } from '@components/about-page/about-page';
import { Administration } from '@components/administration';
import { Spinner } from '@components/common/spinner/spinner';
import { ComparisonPage } from '@components/comparison-page/comparison-page';
import { DetailsPage } from '@components/details-page/details-page';
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
  const { data: authData, isLoading, error } = useGetUserQuery();
  const isAdmin = authData?.role === 'admin';

  if (isLoading && !error) return <Spinner />;

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
        </Route>
        <Route path={AppRoute.SIGN_REDIRECT} element={<RedirectAfterSign />} />
        <Route path={AppRoute.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={AppRoute.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={AppRoute.ROOT} element={<LandingPage />} />
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
        <Route path={AppRoute.SEARCH} element={<SearchPage />} />
        <Route element={<ProtectedRoute isAllowed={!!authData} />}>
          <Route path={AppRoute.COMPARISONS} element={<ComparisonPage />} />
        </Route>
        <Route path={AppRoute.DETAILS} element={<DetailsPage />} />
        <Route path={AppRoute.ABOUT} element={<AboutPage />} />
        <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
