/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { store } from '../main/node/redux/store.ts';
import { fetchWatchlistsQuery } from '../main/node/redux/features/userLists/WatchlistSlice.tsx';
import initAuth from '../main/node/auth/initAuth.tsx';
import '../styles/styles.css';

initAuth();

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // required
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);

function App({ Component, pageProps }) {
  const user = useAuthUser();
  store.dispatch(fetchWatchlistsQuery({ userID: user.id }));
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default withAuthUser()(App);
