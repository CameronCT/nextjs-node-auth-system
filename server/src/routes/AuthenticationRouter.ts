import { Response } from 'express'
import Host from '../utils/HostUtil'
import { RequestWithJWT } from '../types'
import AccountLogService from '../services/AccountLogService'
import Validate from '../utils/Validate'
import sendMail from '../utils/sendMail'
import AuthenticationService from '../services/AuthenticationService'
import getSessionToken from '../utils/getSessionToken'
import getCSRFToken from '../utils/getCSRFToken'
import AppService from '../services/AppService'
import config from '../config'
import AccountService from '../services/AccountService'

const profileLoginFinalized = async (req: RequestWithJWT, res: Response, user: any, isUpdate: boolean = false) => {
    if (!user) return AppService.send(res, 'Unable to find profile on callback!', null, 422)

    if (user?.authPassword) delete user.authPassword

    // JWT
    const jwtToken = AuthenticationService.jwtCreate(user)

    // Tokens
    res.cookie(`accountSession[${config.appId}]`, jwtToken, { maxAge: config.jwt.expiry, domain: config.api.cookieUrl, secure: config.api.secure })

    // Add Logs
    if (!isUpdate) await AccountLogService.add(user.accountId, 'logged_in', Host.getAddress(req))

    return jwtToken
}

const PassportCallback = async (req: RequestWithJWT, res: Response) => {
    const response = await profileLoginFinalized(req, res, req.user)
    if (response) {
        // Resolve
        res.writeHead(301, { Location: config.api.webUrl + '/' })
        res.end()
    } else return AppService.send(res, 'Unable to authenticate!', null, 422)
}

const session = async (req: RequestWithJWT, res: Response) => {
    const data = AuthenticationService.jwtValidate(getSessionToken(req));

    if (!data && config.options.enableGuests) {
        const createGuest = await AuthenticationService.guestCreate().catch((e) => AppService.error('router', e))
        if (createGuest?.data) {
            res.cookie(`accountSession[${config.appId}]`, createGuest?.token, { maxAge: config.jwt.expiry, domain: config.api.cookieUrl, secure: config.api.secure })
            return AppService.sendDefault(res, { data: createGuest?.data, token: createGuest?.token, csrf: getCSRFToken(req) })
        } else return AppService.send(res, 'Unable to create Guest!', null, 422)
    } else if (data)
        return AppService.sendDefault(res, { ...data, token: getSessionToken(req), csrf: getCSRFToken(req) })

    return AppService.send(res, 'Unable to authenticate!', null, 422);
}

const logout = async (_req: RequestWithJWT, res: Response) => {
    res.clearCookie(`accountSession[${config.appId}]`, { domain: config.api.cookieUrl })
    return AppService.send(res, 'ok', {})
}

const login = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress, password } = req.body

    if (!emailAddress || !password) return AppService.send(res, 'Please make sure all fields are filled!', null, 422)

    const getData = await AuthenticationService.basicLogin(emailAddress, password)
    if (getData) {
        if (getData.activationCode) {
            const response = await AuthenticationService.basicSendActivate(emailAddress)
            if (response) {
                await sendMail(
                    emailAddress,
                    `Please confirm your email address`,
                    `
                        Welcome to ${config.name}! In order to login, please activate your account by clicking the link below.<br/><br/>
                        <b><a href="${config.api.webUrl}/auth/activate/${response}">${config.api.webUrl}/auth/activate/${response}</a></b><br/><br/>
                        If you have any issues or have any other questions, please contact ${config.emailAddress}!
                    `
                )
            }
            return AppService.send(res, 'Your account is not activated, please check your email for steps to activate your account!', null, 422)
        } else {
            const getProfile = await AuthenticationService.getByAccountId(getData.accountId)
            const response = await profileLoginFinalized(req, res, getProfile)
            if (response) return AppService.send(res, 'ok', { token: response, csrf: getCSRFToken(req) }, 200)
            else return AppService.send(res, 'Unable to authenticate!', null, 422)
        }
    } else return AppService.send(res, 'Invalid email or password, please try again!', null, 422)
}

const signup = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress, password, displayName } = req.body

    if (!emailAddress || !password || !displayName) return AppService.send(res, 'Please make sure all fields are filled!', null, 422)

    if (!Validate.isLegalUsername(displayName)) return AppService.send(res, "Your display name must be less than 16 characters, greater than 2 characters and doesn't contain a % symbol!", null, 422)

    if (!Validate.isPassword(password)) return AppService.send(res, 'Your password must be at least 8 characters long and contain at least one number, one uppercase, one lowercase letter!', null, 422)

    const emailExists = await AuthenticationService.basicEmailExists(emailAddress)
    if (emailExists) return AppService.send(res, 'This email address is already in use!', null, 422)

    const response = await AuthenticationService.basicSignUp(emailAddress, password, displayName)
    if (response) {
        if (config.options.enableActivation) {
            await sendMail(
                emailAddress,
                `Please confirm your email address`,
                `
                    Welcome to ${config.name}! In order to login, please activate your account by clicking the link below.<br/><br/>
                    <b><a href="${config.api.webUrl}/auth/activate/${response}">${config.api.webUrl}/auth/activate/${response}</a></b><br/><br/>
                    If you have any issues or have any other questions, please contact ${config.emailAddress}!
                `
            )
            return AppService.send(res, config.options.enableActivation ? 'Your account has been created, please check your email inside of your inbox or spam/junk folder for a confirmation email!' : 'Your account has been created!', {
                enableActivation: config.options.enableActivation,
            })
        }
        return AppService.send(res, 'Your account has been created, you may now login!')
    } else return AppService.send(res, 'We were unable to create your account!', null, 422)
}

const sendForgot = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress } = req.body

    if (!emailAddress) return AppService.send(res, 'Please make sure all fields are filled!', null, 422)

    const response = await AuthenticationService.basicSendForgot(emailAddress)
    if (response) {
        await sendMail(
            emailAddress,
            `Reset your password`,
            `
                You have requested to reset your password, please click the link below to reset your password.<br/><br/>
                <b><a href="${config.api.webUrl}/auth/forgot/${response}">${config.api.webUrl}/auth/forgot/${response}</a></b><br/><br/>
                If you did not make this request, you may contact ${config.emailAddress} or simply ignore it.
            `
        )
    }
    return AppService.send(res, 'You will receive a message containing instructions to reset your password if your account exists.', {})
}

const forgot = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress, password, key } = req.body

    if (!emailAddress || !password || !key) return AppService.send(res, 'Please make sure all fields are filled!', null, 422)

    if (!Validate.isPassword(password)) return AppService.send(res, 'Your password must be at least 8 characters long and contain at least one number, one uppercase, one lowercase letter!', null, 422)

    const response = await AuthenticationService.basicForgot(emailAddress, key, password)
    if (response) {
        await sendMail(
            emailAddress,
            `Your password has been changed`,
            `
                You have successfully changed your password!<br/><br/>
                If you did not perform this request, please contact ${config.emailAddress} immediately!
            `
        )
        return AppService.send(res, 'Your password has been changed!')
    } else return AppService.send(res, 'Unable to validate your request, please make sure all fields are filled correctly!', null, 422)
}

const activate = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress, key } = req.body

    if (!emailAddress || !key) return AppService.send(res, 'Please make sure all fields are filled!', null, 422)

    const response = await AuthenticationService.basicActivate(emailAddress, key)
    if (response) {
        await sendMail(emailAddress, `Your account has been activated`, `Welcome! Your account is all set and ready to go!`)

        const getProfile = await AuthenticationService.getByAccountId(response)
        const setProfile = await profileLoginFinalized(req, res, getProfile)
        if (setProfile) return AppService.send(res, 'ok', { token: setProfile, csrf: getCSRFToken(req) })
        else return AppService.send(res, 'Unable to authenticate!', null, 422)
    } else return AppService.send(res, 'Unable to validate your request, please make sure all fields are filled correctly!', null, 422)
}

const gdpr = async (req: RequestWithJWT, res: Response) => {
    return AppService.send(res, 'ok', { 
        accountData: await AccountService.getOne(String(req.jwtSession?.accountId)),
        logData: await AccountLogService.getByAccountId(String(req.jwtSession?.accountId))
     })
};

const remove = async (req: RequestWithJWT, res: Response) => {
    if (!req.jwtSession?.accountId) return AppService.send(res, 'Invalid session!', null, 422)

    const response = await AccountService.remove(String(req.jwtSession?.accountId))
    if (response) {
        res.clearCookie(`accountSession[${config.appId}]`, { domain: config.api.cookieUrl })
        return AppService.send(res, 'ok', response)
    }
    else return AppService.send(res, 'Unable to validate your request, please make sure all fields are filled correctly!', null, 422)
};

export default { profileLoginFinalized, PassportCallback, session, logout, login, signup, forgot, sendForgot, activate, gdpr, remove }
