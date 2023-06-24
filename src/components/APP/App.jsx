import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import { getToken } from 'redux/selectors';
import AppBar from 'components/AppBar';
import { RestrictedRoute } from 'components/RestrictedRoute';
import { PrivatRoute } from 'components/PrivatRoute';
import { useGetCurrentQuery } from 'redux/userApi';

import css from './App.module.css';

const HomePage = lazy(() => import('pages/Home/HomePage'));
const LoginPage = lazy(() => import('pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('pages/Register/RegisterPage'));
const AddPage = lazy(() => import('../../pages/Add/AddPage'));
const ContactsPage = lazy(() => import('pages/Contacts/ContactsPage'));
const NotFoundPage = lazy(() => import('pages/NotFound/NotFoundPage'));

const App = () => {
  const token = useSelector(getToken);

  const { isLoading } = useGetCurrentQuery(undefined, {
    skip: !token,
  });

  return (
    <>
      <AppBar />
      {isLoading ? (
        <p className={css.default}>...loading</p>
      ) : (
        <Suspense fallback={<p className={css.default}>...loading</p>}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={RegisterPage}
                  redirectTo="/contacts"
                />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <RestrictedRoute component={LoginPage} redirectTo="/contacts" />
              }
            ></Route>
            <Route
              path="/add"
              element={<PrivatRoute component={AddPage} redirectTo="/" />}
            ></Route>
            <Route
              path="/contacts"
              element={<PrivatRoute component={ContactsPage} redirectTo="/" />}
            ></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
};

export default App;