import { RequestWithJWT } from '../types'
import { NextFunction, Response } from 'express'
import getCSRFToken from '../utils/getCSRFToken'
import AppService from '../services/AppService'

export default (req: RequestWithJWT, res: Response, next: NextFunction) => {
    const getCSRF = getCSRFToken(req)
    const isCapacitorJS = req.headers.origin?.startsWith('capacitor://') || false

    if (!isCapacitorJS && (!getCSRF || getCSRF !== req.body._csrf)) return AppService.send(res, 'Your session has expired, please try again!', null, 422)
    else next()
}
