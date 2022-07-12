import rateLimit from 'express-rate-limit'
import { Request } from 'express'
import HostUtil from '../utils/HostUtil'

const sessionRequest = rateLimit({ windowMs: 2000, max: 50, keyGenerator: (req: Request) => HostUtil.getAddress(req) })
const sessionUpdate = rateLimit({ windowMs: 1000, max: 2, keyGenerator: (req: Request) => HostUtil.getAddress(req) })
const standardPostRequest = rateLimit({ windowMs: 1000, max: 1, keyGenerator: (req: Request) => HostUtil.getAddress(req) })
const standardGetRequest = rateLimit({ windowMs: 5000, max: 30, keyGenerator: (req: Request) => HostUtil.getAddress(req) })

export default { standardGetRequest, standardPostRequest, sessionRequest, sessionUpdate }
