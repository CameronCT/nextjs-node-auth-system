import { RequestWithJWT } from '../types'
import crypto from 'crypto'

export default (req: RequestWithJWT) => req.cookies?._csrf || req.headers?.['x-csrf-token'] || crypto.randomBytes(20).toString('hex') || ''
