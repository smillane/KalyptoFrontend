import React from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth';

import FirebaseAuth from '../main/node/auth/FirebaseAuth';

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
  return <FirebaseAuth />;
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
