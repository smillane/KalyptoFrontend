/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { Text } from '@mantine/core';

import LayoutWithAuth from '../main/node/components/layout.tsx';

function about() {
  return (
    <LayoutWithAuth>
      <Text transform="capitalize">About page</Text>
    </LayoutWithAuth>
  );
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(about);
