import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../products/pages/HomePage'
import { LoginPage } from '~/auth'
import { PublicRouter } from './PublicRouter'
import { ProductRouter } from '../products/router/ProductRouter'
import { PrivateRouter } from './PrivateRouter'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path='/login'
          element={
              <PublicRouter>
                  <LoginPage/>
              </PublicRouter>
          }
        />
        <Route
          path='/'
          element={
            <PublicRouter>
                <HomePage/>
            </PublicRouter>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRouter>
              <ProductRouter />
            </PrivateRouter>
          }
        />
      </Routes>
    </>
  );
};
