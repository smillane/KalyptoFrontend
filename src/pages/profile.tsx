import React from 'react';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

import LayoutWithAuth from '../main/node/components/layout.tsx';
import LoginButton from '../main/node/components/loginButton.tsx';

function Demo() {
  const AuthUser = useAuthUser();
  return (
    <LayoutWithAuth>
      <p>
        Your email is
        {AuthUser.email ? AuthUser.email : ' unknown'}
        .
      </p>
      <LoginButton />
    </LayoutWithAuth>
  );
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
