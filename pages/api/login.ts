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
  console.log('client', client);
  const db = client.db('users');
  console.log('db', db);
  const usersCollection = db.collection('users');
  console.log('usersCollection', usersCollection);
  const user = await usersCollection.findOne({ email });
  console.log('user', user);

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
