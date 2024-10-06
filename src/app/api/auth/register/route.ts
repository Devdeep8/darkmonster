// app/api/auth/register/route.js
import dbConnect  from '@/lib/dbconnect';
import User from '@/models/user';
import { NextResponse , NextRequest } from 'next/server';


export async function POST(request : NextRequest) {
  await dbConnect();
  const { name, email, password } = await request.json();

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Create a new user with plain text password (insecure)
  const user = await User.create({ name, email, password });

  if (user) {
    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    }, { status: 201 });
  } else {
    return NextResponse.json({ message: 'Invalid user data' }, { status: 400 });
  }
}
