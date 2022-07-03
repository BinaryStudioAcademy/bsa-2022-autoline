import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '@common/enums/app/app';

const Routing: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.SIGN_IN} element={<h2>Auth SIGN_IN</h2>} />
        <Route path={AppRoute.SIGN_UP} element={<h2>Auth SIGN_UP</h2>} />
        <Route path={AppRoute.ROOT} element={<h2>Auth root route</h2>} />
        <Route path={AppRoute.NOT_FOUND} element={<h2>Not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
