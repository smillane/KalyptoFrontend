import React, { useContext } from 'react';
import { Button } from '@mantine/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Link from 'next/link';

import { AuthStateContext } from './layout.tsx';

export default function LoginLogoutButton() {
  const authState: boolean = useContext(AuthStateContext);
  if (authState === false) {
    return (
      <Link href="/login" passHref>
        <Button variant="outline" color="dark">Sign In</Button>
      </Link>
    );
  }
  return (
    <Button variant="outline" color="dark" onClick={() => firebase.auth().signOut()}>Sign Out</Button>
  );
}
