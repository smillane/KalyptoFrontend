import { init } from 'next-firebase-auth';

const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000;

const initAuth = () => {
  init({
    // This demonstrates setting a dynamic destination URL when
    // redirecting from app pages. Alternatively, you can simply
    // specify `authPageURL: '/auth-ssr'`.
    authPageURL: ({ ctx }) => {
      const isServerSide = typeof window === 'undefined';
      const origin = isServerSide
        ? absoluteUrl(ctx.req).origin
        : window.location.origin;
      const destPath = typeof window === 'undefined' ? ctx.resolvedUrl : window.location.href;
      const destURL = new URL(destPath, origin);
      return `auth-ssr?destination=${encodeURIComponent(destURL)}`;
    },

    // This demonstrates setting a dynamic destination URL when
    // redirecting from auth pages. Alternatively, you can simply
    // specify `appPageURL: '/'`.
    appPageURL: ({ ctx }) => {
      const isServerSide = typeof window === 'undefined';
      const origin = isServerSide
        ? absoluteUrl(ctx.req).origin
        : window.location.origin;
      const params = isServerSide
        ? new URL(ctx.req.url, origin).searchParams
        : new URLSearchParams(window.location.search);
      const destinationParamVal = params.get('destination')
        ? decodeURIComponent(params.get('destination'))
        : undefined;

      // By default, go to the index page if the destination URL
      // is invalid or unspecified.
      let destURL = '/';
      if (destinationParamVal) {
        // Verify the redirect URL host is allowed.
        // https://owasp.org/www-project-web-security-testing-guide/v41/4-Web_Application_Security_Testing/11-Client_Side_Testing/04-Testing_for_Client_Side_URL_Redirect
        const allowedHosts = ['localhost:3000', 'nfa-example.vercel.app'];
        const allowed = allowedHosts.indexOf(new URL(destinationParamVal).host) > -1;
        if (allowed) {
          destURL = destinationParamVal;
        } else {
          // eslint-disable-next-line no-console
          console.warn(
            `Redirect destination host must be one of ${allowedHosts.join(
              ', ',
            )}.`,
          );
        }
      }
      return destURL;
    },
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    onLoginRequestError: (err) => {
      console.error(err);
    },
    onLogoutRequestError: (err) => {
      console.error(err);
    },
    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: false,
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // required
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    cookies: {
      name: 'kalypto', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: TWELVE_DAYS_IN_MS,
      overwrite: true,
      path: '/',
      sameSite: 'lax',
      secure: false, // set this to false in local (non-HTTPS) development
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
    },
  });
};

export default initAuth;
