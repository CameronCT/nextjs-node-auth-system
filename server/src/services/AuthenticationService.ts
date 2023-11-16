import jwt from 'jsonwebtoken'
import { AccountSessionData } from '../types'
import UniqueIdService from './UniqueIdService'
import AppService from './AppService'
import bcrypt from 'bcrypt'
import Config from '../config'
import Account from '../models/Account'

const jwtValidate = (token: string): { data: AccountSessionData } => {
    let payload

    try {
        payload = jwt.verify(token, Config.jwt.secret)
    } catch (e) {
        payload = null
    }

    return payload as { data: AccountSessionData }
}

const jwtCreate = (data: object) => {
    return jwt.sign({ data }, Config.jwt.secret, {
        algorithm: 'HS256',
        expiresIn: Config.jwt.expiry / 1000,
    })
}

const getByAccountId = async (accountId: string) => await Account.findOne({ accountId }).catch((e) => AppService.error('service', e))

const basicEmailExists = async (emailAddress: string) => {
    const checkEmail = await Account.findOne({ emailAddress }).catch((e) => AppService.error('service', e))
    return checkEmail ? true : false
}

const basicLogin = async (emailAddress: string, password: string) => {
    const getProfile = await Account.findOne({ emailAddress, authName: 'Local' }).catch((e) => AppService.error('service', e))
    if (getProfile && getProfile.authPassword && bcrypt.compareSync(password, getProfile.authPassword)) return getProfile
    else return null
}

const basicSignUp = async (emailAddress: string, password: string, displayName: string) => {
    let useAuth
    const generateId = String(UniqueIdService.generateSnowflake())
    const generateActivation = await UniqueIdService.generateUUID()
    const generatePassword = bcrypt.hashSync(password, 10)

    useAuth = await Account.insertOne({
        accountId: generateId,
        emailAddress,
        displayName,
        avatarSrc: `${Config.api.filesUrl}/avatars/default.png`,
        authName: 'Local',
        authId: '',
        authPassword: generatePassword,
        activationCode: Config.options.enableActivation ? generateActivation : '',
    }).catch((e) => AppService.error('service', e))

    if (useAuth) {
        const createPlayer = await Account.findOneOrCreate(
            { accountId: generateId },
            {
                accountId: generateId,
                displayName,
                avatarSrc: `${Config.api.secure ? 'https' : 'http'}://${Config.api.filesUrl}/avatars/default.png`,
                created: Math.round(new Date().getTime() / 1000),
            }
        )
        if (createPlayer) {
            createPlayer.authName = 'Local'
            return generateActivation
        } else return null
    }
}

const basicSendActivate = async (emailAddress: string) => {
    const generateCode = await UniqueIdService.generateUUID()
    const response = await Account.findOneAndUpdate({ emailAddress, authName: 'Local' }, { activationCode: generateCode }, false, '$set').catch((e) => AppService.error('service', e))
    if (response) return generateCode
    else return null
}

const basicActivate = async (emailAddress: string, activationCode: string) => {
    const response = await Account.findOneAndUpdate({ emailAddress, authName: 'Local', activationCode }, { activationCode: '' }, false, '$set').catch((e) => AppService.error('service', e))
    if (response) return response.accountId
    else return null
}

const basicSendForgot = async (emailAddress: string) => {
    const generateForgot = await UniqueIdService.generateUUID()
    const response = await Account.findOneAndUpdate({ emailAddress, authName: 'Local' }, { recoveryCode: generateForgot }, false, '$set').catch((e) => AppService.error('service', e))
    if (response) return generateForgot
    else return null
}

const basicForgot = async (emailAddress: string, recoveryCode: string, password: string) => {
    const newPassword = bcrypt.hashSync(password, 10)
    const response = await Account.findOneAndUpdate({ emailAddress, authName: 'Local', recoveryCode }, { authPassword: newPassword, recoveryCode: '' }, false, '$set').catch((e) => AppService.error('service', e))
    if (response) return true
    else return null
}

const manualActivate = async (accountId: string) => {
    const response = await Account.findOneAndUpdate({ accountId, authName: 'Local' }, { activationCode: '' }, false, '$set').catch((e) => AppService.error('service', e))
    if (response) return response.accountId
    else return null
}

const guestCreate = async () => {
    const generateAuthId = UniqueIdService.generateOther('accountId')
    const generateAuthCode = UniqueIdService.generateOther('discriminator')
    const generateGuestCode = UniqueIdService.generateOther('guestId')

    const createGuest = await passportFindOrCreate('Guest', String(generateAuthId), `guest[${generateGuestCode}].${generateAuthCode}@guest.com`, `Guest_${UniqueIdService.generateOther('discriminator')}`, `${Config.api.filesUrl}/avatars/default.png`)
    if (createGuest) {
        return {
            data: createGuest,
            token: jwtCreate(createGuest) || '',
        }
    } else return null
}

const passportFindOrCreate = async (authName: string, authId: string, emailAddress: string, displayName: string, avatarSrc: string = `${Config.api.filesUrl}/avatars/default.png`) => {
    const generateId = String(UniqueIdService.generateSnowflake())

    const checkAuthId = await Account.findOne({ authName, authId: String(authId) }).catch((e) => AppService.error('service', e))
    const checkAuthEmail = await Account.findOne({ emailAddress }).catch((e) => AppService.error('service', e))

    const checkAuth = (!checkAuthId && !checkAuthEmail) 
        ? await Account.insertOne({ accountId: generateId, emailAddress, displayName, avatarSrc, authName, authId: String(authId), authUser: '', authPassword: '' }).catch((e) => AppService.error('service', e))
        : checkAuthId || checkAuthEmail 

    if (checkAuth) {
        delete checkAuth.authPassword
        return checkAuth
    } else return null
}

export default { jwtCreate, jwtValidate, getByAccountId, passportFindOrCreate, guestCreate, basicEmailExists, basicLogin, basicSignUp, basicActivate, basicSendActivate, basicForgot, basicSendForgot, manualActivate }
