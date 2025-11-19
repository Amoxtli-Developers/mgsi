import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials against environment variables
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (username === validUsername && password === validPassword) {
      // Generate a simple token (you can make this more complex if needed)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

      return NextResponse.json(
        {
          success: true,
          token,
          message: 'Login successful'
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
