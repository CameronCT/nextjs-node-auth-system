import { RequestWithJWT } from '../types'

export default (req: RequestWithJWT) => req.cookies?.accountSession || req.headers?.['x-authentication-token'] || ''
