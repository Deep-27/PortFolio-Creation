import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Layout/Loading';

export const ProtectedRoute = ({ children }) => {
  const [login, setLogin] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    login && router.replace('/auth/login');
  }, [login, router]);

  useEffect(() => {
    !isAuth && setLogin(true);
  }, [isAuth]);

  return <>{isAuth ? children : <Loader />}</>;
};
