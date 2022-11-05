import Config from '../config'
import { RequestWithJWT } from '../types'

export default (req: RequestWithJWT) => req.cookies?.[`accountSession[${Config.appId}]`] || req.headers?.['x-authentication-token'] || ''
