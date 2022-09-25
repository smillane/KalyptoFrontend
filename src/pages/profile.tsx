import React from 'react';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

import Layout from '../main/node/components/layout.tsx';
import AuthStateButton from '../main/node/auth/authStateButton';

function Demo() {
  const AuthUser = useAuthUser();
  return (
    <Layout>
      <p>
        Your email is
        {AuthUser.email ? AuthUser.email : ' unknown'}
        .
      </p>
      <AuthStateButton />
    </Layout>
  );
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
