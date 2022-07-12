import { Request } from 'express'

export type CallbackJWT = (httpCode: number, data: AccountData | {}) => void

export interface RequestWithJWT extends Request {
    jwtSession?: AccountData
}

export interface AccountSessionData extends AccountData {}

export interface AccountData {
    accountId: string
    emailAddress: string
    avatarSrc: string
    password: string
    authName: string
    authId: string
    displayName: string
    firstName: string
    lastName: string
    activationCode: string
    recoveryCode: string
    adminLevel?: number
    isGuest: boolean
    created: string
}
