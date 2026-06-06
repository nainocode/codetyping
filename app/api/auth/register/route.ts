export const runtime = "nodejs"
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User, { IUser } from '@/lib/models/User'
import { generateToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    console.log('Registration API called')
    const body = await request.json()
    console.log('Request body:', { ...body, password: '***' })
    
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required', code: 'MISSING_FIELDS' },
        { status: 400 }
      )
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address', code: 'INVALID_EMAIL' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long', code: 'WEAK_PASSWORD' },
        { status: 400 }
      )
    }

    console.log('Connecting to database...')
    // Connect to database
    await connectDB()
    console.log('Database connected')

    console.log('Checking if user exists:', email)
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists', code: 'USER_EXISTS' },
        { status: 409 }
      )
    }

    console.log('Creating new user...')
    // Create new user
    const user = new User({
      name,
      email,
      password
    })

    console.log('Saving user to database...')
    await user.save()
    console.log('User saved successfully:', user._id)

    // Generate token
    const token = generateToken(user)
    console.log('Token generated')

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      typingStats: user.typingStats,
      createdAt: user.createdAt
    }

    console.log('Sending success response')
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: userResponse,
        token
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
