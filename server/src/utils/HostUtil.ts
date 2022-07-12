import { Request } from 'express'

const getAddress = (req: Request): string => {
    return `${req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip || '255.255.255.255'}`
}

export default { getAddress }
