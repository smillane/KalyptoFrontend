/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../main/node/redux/store.ts';
import initAuth from '../main/node/auth/initAuth.tsx';
import '../styles/styles.css';

initAuth();

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
