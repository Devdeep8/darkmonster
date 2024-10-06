import dbConnect from '@/lib/dbconnect';
import Form from '@/models/Form';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Secret for decoding JWT (Ensure it's the same one used for signing the token)
const JWT_SECRET = process.env.JWT_SECRET || 'MaheshGadhaHE';

// Custom interface to extend JwtPayload with userId
interface CustomJwtPayload extends JwtPayload {
  userId?: string;
}

// Helper function to extract and decode userId from JWT token
const getUserIdFromToken = (req: Request): string => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) throw new Error('No token found in cookies');

    // Decode token and assert its structure as CustomJwtPayload
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    if (!decoded.userId) {
      throw new Error('Invalid token: userId not found');
    }

    return decoded.userId;
  } catch (error: any) {
    console.error('Error decoding token:', error.message);
    throw new Error('Invalid or missing token');
  }
};

// Named export for POST method
export async function POST(req: Request) {
  await dbConnect();

  try {
    // Get userId from token
    const userId = getUserIdFromToken(req);

    const body = await req.json();
    const form = new Form({
      ...body,
      userId: new ObjectId(userId).toString(), // Convert ObjectId to string for storing
    });

    const savedForm = await Form.create(form);
    return new Response(JSON.stringify({ savedForm, success: true }), { status: 201 });
  } catch (error: any) {
    console.error(error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

// Named export for GET method
export async function GET(req: Request) {
  await dbConnect();

  try {
    // Extract token from the request headers
    const token = req.headers.get('Authorization')?.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"

    if (!token) throw new Error('No token found in Authorization header');

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    // Get userId from decoded token
    const userId = decoded.userId;

    const forms = await Form.find({ userId }).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, forms }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

