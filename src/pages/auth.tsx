import React from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth';

import FirebaseAuth from '../main/node/auth/FirebaseAuth';
import LayoutWithAuth from '../main/node/components/layout.tsx';

const styles = {
  content: {
    padding: '8px 32px',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 16,
  },
};

function Auth() {
  return (
    <LayoutWithAuth>
      <div style={styles.textContainer}>
        <p>
          This auth page is
          {' '}
          <b>static</b>
          . It will redirect to login if you are not
          logged in.
        </p>
      </div>
      <div>
        <FirebaseAuth />
      </div>
    </LayoutWithAuth>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Auth);
