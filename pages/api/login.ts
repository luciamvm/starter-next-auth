import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from './../../lib/mongodb';

type Data = {
  success: boolean;
  result?: any;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false });
    return;
  }

  const { email, password } = req.body;

  const client = await clientPromise;
  const db = client.db('users');
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email });

  if (!user) {
    res.status(401).json({ success: false });
    return;
  }

  const isValidPassword = (await password) == user.password ? true : false;

  if (!isValidPassword) {
    res.status(401).json({ success: false });
    return;
  }

  res.status(200).json({ success: true, result: user });
}
