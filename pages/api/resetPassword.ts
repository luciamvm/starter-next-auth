import { NextApiRequest, NextApiResponse } from 'next';

import { ObjectId } from 'mongodb';
import clientPromise from './../../lib/mongodb';

const bcrypt = require('bcrypt');

type Data = {
  success: boolean;
  result?: any;
};

export default async function resetPassword(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false });
    return;
  }

  let { id, password } = req.body;

  const client = await clientPromise;
  const db = client.db('users');
  const usersCollection = db.collection('users');

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  try {
    const user = await usersCollection.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { $set: { password: password } }
    );

    return res.status(200).json({ success: true, result: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
