// app/api/auth/login/route.js
import dbConnect  from '@/lib/dbconnect';
import User from '@/models/user';
import { NextResponse , NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';


export async function POST(request : NextRequest) {
  await dbConnect();
  const { email, password } = await request.json();

  const user = await User.findOne({ email });

  // Check if user exists and password matches (plain text)
  if (user && user.password === password) {
    const token = jwt.sign({ userId: user._id }, "MaheshGadhaHE", { expiresIn: '30d' });
    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }
}
