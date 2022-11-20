import React from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import {
  AppShell, Container, Title, Text,
} from '@mantine/core';

import FirebaseAuth from '../main/node/auth/FirebaseAuth';
import Meta from '../main/node/components/meta';

function Auth() {
  return (
    <AppShell>
      <Meta />
      <Container>
        <Title
          order={2}
          align="center"
        >
          Log in to Kalypto
        </Title>
        <FirebaseAuth />
        <Text>Not on Kalypto? Choose from above how you would like to create an account</Text>
      </Container>
    </AppShell>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
