import { setAuthCookies } from 'next-firebase-auth';

import initAuth from '../../main/node/auth/initAuth.tsx';

initAuth();

const handler = async (req, res) => {
  try {
    await setAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' });
  }
  return res.status(200).json({ success: true });
};

export default handler;
