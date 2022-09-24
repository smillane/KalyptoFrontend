import React from 'react';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { Button } from '@mantine/core';

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
};

function Demo() {
  const AuthUser = useAuthUser();
  return (
    <div>
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Home</h3>
          <p>
            This page does not require authentication, so it will not redirect to
            the login page if you are not signed in.
          </p>
          <p>
            If you remove `getServerSideProps` from this page, it will be static
            and load the authed user only on the client side.
          </p>
          <Button onClick={() => AuthUser.signOut}>Sign Out</Button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
