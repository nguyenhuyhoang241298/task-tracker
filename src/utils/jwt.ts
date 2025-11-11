import JWT from 'jsonwebtoken'
import process from 'node:process'
import { BackendError } from './errors'

const JWT_CONFIG: JWT.SignOptions = {
  expiresIn: '10m'
}

const jwtSecret = process.env.JWT_SECRET ?? ''

export default function generateToken(userId: number): string {
  return JWT.sign({ userId }, jwtSecret, JWT_CONFIG)
}

export function verifyToken(token: string) {
  try {
    const data = JWT.verify(token, jwtSecret)

    return data as { userId: number }
  } catch (err) {
    if (err instanceof JWT.TokenExpiredError) {
      throw new BackendError('UNAUTHORIZED', {
        message: 'Token expired'
      })
    }

    throw new BackendError('UNAUTHORIZED', {
      message: 'Invalid token'
    })
  }
}
