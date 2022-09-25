import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Link from 'next/link';

export default function AuthStateButton() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
    // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <Link href="/login" passHref>
        <Button>Sign In</Button>
      </Link>
    );
  }
  return (
    <Button onClick={() => firebase.auth().signOut()}>Sign Out</Button>
  );
}
