import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from './../../lib/mongodb';
const bcrypt = require('bcrypt');

type Data = {
  success: boolean;
  result?: any;
};

export default async function createAccount(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false });
    return;
  }

  let { name, email, password } = req.body;

  const client = await clientPromise;
  const db = client.db('users');
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email });

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  if (!user) {
    // Create a new user
    try {
      usersCollection.insertOne({
        name: name,
        email: email,
        password: password,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  } else {
    // User is already registed
    res.status(401).json({ success: false });
  }
}
