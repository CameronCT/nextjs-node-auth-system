import Config from './config'
import dotenv from 'dotenv'
dotenv.config()

export interface OAuthParameters {
    Client: string
    Secret: string
    Callback: string
}

export interface OAuth {
    Discord: OAuthParameters
    Google: OAuthParameters
    GitHub: OAuthParameters
}

const payload: OAuth = {
    Discord: {
        Client: '123',
        Secret: String(process.env.OAUTH_DISCORD || ''),
        Callback: `${Config.api.oauthUrl}/auth/discord/callback`,
    },
    Google: {
        Client: '123',
        Secret: String(process.env.OAUTH_GOOGLE || ''),
        Callback: `${Config.api.oauthUrl}/auth/google/callback`,
    },
    GitHub: {
        Client: '123',
        Secret: String(process.env.OAUTH_GITHUB || ''),
        Callback: `${Config.api.oauthUrl}/auth/github/callback`,
    },
}

export default payload
