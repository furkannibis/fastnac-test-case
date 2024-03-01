import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { PrivateLogin, PrivateRoutes } from './routes/specialRoutes';

import { LoginPage } from './components/login';
import { HomePage } from './components/home';
import { UserPage } from './components/user';
import { CustomerPage } from './components/customer';
import { ProductPage } from './components/product';
import { ErrorPage } from './components/error';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateLogin />}>
          <Route index element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/users' element={<UserPage />} />
          <Route path='/customers' element={<CustomerPage />} />
          <Route path='/products' element={<ProductPage />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
