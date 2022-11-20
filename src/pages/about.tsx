/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import {
  Center, Container, Space, Text, Title,
} from '@mantine/core';

import Layout from '../main/node/components/layout.tsx';

function about() {
  return (
    <Layout>
      <Container>
        <Center>
          <Title>About</Title>
        </Center>
        <Space h="md" />
        <Title order={3}>Future features to be added:</Title>
        <Space h="md" />
        <Text>SEC Filings</Text>
        <Text>Congressional Trades</Text>
        <Text>Crypto, Commoddities, Bonds</Text>
      </Container>
    </Layout>
  );
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(about);
