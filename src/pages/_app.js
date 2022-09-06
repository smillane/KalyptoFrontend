import React from 'react';
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';

import { store } from '../main/node/redux/store';
import "../styles/styles.css";


export default function App({ Component, pageProps: { session, ...pageProps }, }) {  
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}