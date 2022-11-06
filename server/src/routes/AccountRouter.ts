import { Response } from 'express'
import AccountService from '../services/AccountService'
import AppService from '../services/AppService'
import { RequestWithJWT } from '../types'
import Validate from '../utils/Validate'
import AuthenticationRouter from './AuthenticationRouter'

const getByUrl = async (req: RequestWithJWT, res: Response) => {
    const { url } = req.query

    if (!url) 
        return AppService.send(res, 'Invalid request!', null, 422)

    const response = await AccountService.getByUrl(String(url))
    if (response) return AppService.send(res, 'ok', response)
    else return AppService.send(res, 'Unable to find your profile!', null, 422)
};

const update = async (req: RequestWithJWT, res: Response) => {
    const { displayName } = req.body

    if (!req.jwtSession?.accountId) return AppService.send(res, 'Invalid session!', null, 422)

    if (!Validate.isLegalUsername(displayName)) return AppService.send(res, "Your display name must be less than 16 characters, greater than 2 characters and doesn't contain a % symbol!", null, 422)

    const response = await AccountService.update(String(req.jwtSession?.accountId), displayName)
    if (response) {
        const setProfile = await AuthenticationRouter.profileLoginFinalized(req, res, response)
        if (setProfile) return AppService.send(res, 'ok', { token: setProfile })
        else return AppService.send(res, 'Unable to find your profile!', null, 422)
    } else return AppService.send(res, 'Unable to validate your request, please make sure all fields are filled correctly!', null, 422)
}

export default { getByUrl, update }
