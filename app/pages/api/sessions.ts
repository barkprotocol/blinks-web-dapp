import { NextApiRequest, NextApiResponse } from 'next';
import { fetchUserSession } from '@/lib/auth/session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await fetchUserSession(req);

  if (session) {
    return res.status(200).json(session);
  } else {
    return res.status(401).json({ message: 'Not authenticated' });
  }
}
