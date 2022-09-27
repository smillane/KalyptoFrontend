import React from 'react';
import {
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { Container, Grid, Text } from '@mantine/core';

import LayoutWithAuth from '../main/node/components/layout.tsx';
import Watchlist from '../main/node/redux/features/userLists/Watchlist.tsx';

function Demo() {
  return (
    <LayoutWithAuth>
      <Grid grow>
        <Container size="xl">
          <h3>Home</h3>
          <Text>
            This page does not require authentication, so it won&apos;t redirect to
            the login page if you are not signed in.
          </Text>
          <Text>
            If you remove `getServerSideProps` from this page, it will be static
            and load the authed user only on the client side.
          </Text>
        </Container>
        <Watchlist />
      </Grid>
    </LayoutWithAuth>
  );
}

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
