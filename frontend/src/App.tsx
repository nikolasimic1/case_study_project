import { FunctionComponent, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import {
  ElementBase,
  ArticleDetails,
  ArticleHome,
  SignIn,
  SignUp,
  ProfileSettings,
  LoadingPage,
} from './components';
import { useAtomValue } from 'jotai';
import { authAtom } from './stores';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { populateArticlesApi } from './api';

export const App: FunctionComponent = () => {
  const { token } = useAtomValue(authAtom);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Fetch articles
  const fetchArticles = async () => {
    const response = await populateArticlesApi();
    if (response === 200) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchArticles();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchArticles();
    }, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <SnackbarProvider />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route path="/" element={<ElementBase />}>
            <Route index element={<ArticleHome />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="articles/:id" element={<ArticleDetails />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
