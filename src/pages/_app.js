import React from 'react'
import ReactDOM from 'react-dom'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'

import { store } from '../main/node/redux/store'
import "../styles/styles.css"


export default function App({ Component, pageProps: { session, ...pageProps }, }) {  
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}