import { NextFunction, Response } from 'express'
import AppService from '../services/AppService'
import AuthenticationService from '../services/AuthenticationService'
import { RequestWithJWT } from '../types'
import getSessionToken from '../utils/getSessionToken'

export default (req: RequestWithJWT, res: Response, next: NextFunction) => {
    const getSession = AuthenticationService.jwtSimpleValidate(getSessionToken(req))
    if (getSession) {
        req.jwtSession = getSession.data
        next()
    } else return AppService.send(res, 'Invalid session!', null, 422)
}
