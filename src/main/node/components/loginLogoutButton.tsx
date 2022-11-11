import React from 'react';
import { Button } from '@mantine/core';
import 'firebase/compat/auth';
import Link from 'next/link';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

function LoginLogoutButton() {
  const AuthUser = useAuthUser();
  if (AuthUser.id === null) {
    return (
      <Link href="/auth" passHref>
        <Button variant="outline" color="dark">Sign In</Button>
      </Link>
    );
  }
  return (
    <Button variant="outline" color="dark" onClick={() => AuthUser.signOut()}>Sign Out</Button>
  );
}

export default withAuthUser()(LoginLogoutButton);
