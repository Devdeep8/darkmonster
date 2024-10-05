import dbConnect from '@/lib/dbconnect';
import Form from '@/models/Form';
import { ObjectId } from 'mongodb'; // Use this if you expect userId to be ObjectId
import { NextResponse } from 'next/server';

// Named export for POST method
export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json(); 
    console.log(body)// Parsing request body
    const form = new Form({
      ...body,
      userId: new ObjectId(body.userId).toString(), // Convert ObjectId to string for storing
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
    const url = new URL(req.url);
    let userId = url.searchParams.get("userId");

    // Handle missing or invalid userId
    if (!userId) {
      return new Response(JSON.stringify({ success: false, error: "Missing userId" }), { status: 400 });
    }

    // If userId is expected to be an ObjectId, convert it
    if (ObjectId.isValid(userId)) {
      userId = new ObjectId(userId).toString(); // Ensure it's a string for querying
    } else {
      return new Response(JSON.stringify({ success: false, error: "Invalid userId" }), { status: 400 });
    }

    const forms = await Form.find({ userId }).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, forms }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}
