import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import "../styles/styles.css"

export default function App({ Component, pageProps }) {
  const { user } = pageProps;
  
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}