/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { Text } from '@mantine/core';

import LayoutWithAuth from '../main/node/components/layout.tsx';

function Demo() {
  const AuthUser = useAuthUser();
  return (
    <LayoutWithAuth>
      <Text transform="capitalize">Hello, {AuthUser.displayName}.</Text>
      <Text align="center">
        Your email is {AuthUser.email}.
      </Text>
    </LayoutWithAuth>
  );
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
