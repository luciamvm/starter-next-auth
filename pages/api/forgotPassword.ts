import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import clientPromise from './../../lib/mongodb';

type Data = {
  success: boolean;
  result?: any;
};

export default async function forgotPassword(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false });
    return;
  }

  const { email } = req.body;

  const client = await clientPromise;
  const db = client.db('users');
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email });

  if (!user) {
    res.status(401).json({ success: false });
    return;
  }

  const userId = user._id.toString();

  // Send email
  const transporter = nodemailer.createTransport({
    port: 465,

    host: process.env.HOST,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    secure: true,
  });

  const mailOptions = {
    from: `Password reset ${process.env.EMAIL}`,
    to: user.email,
    subject: `Your App - Reset Password`,
    html: `
    <h3>Hello ${user.name}</h3>
    <p>There was a request to change your password!</p>
    <p>Click the link below to proceed. </p>
    <a target="_" href="127.0.0.1:3000/reset-password/${userId}">link</a>
    <p>If you did not request a password reset, please ignore this email or reply to let us know.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
