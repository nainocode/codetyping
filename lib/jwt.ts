import jwt from 'jsonwebtoken'
import { IUser } from '@/lib/models/User'

const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local')
}

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { 
      id: user._id.toString(), 
      email: user.email, 
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}
