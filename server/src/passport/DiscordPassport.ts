import OAuth from '../oauth'
import passportDiscord from 'passport-discord'
import removeAccents from 'remove-accents'
import nameGenerator from '../utils/nameGenerator'
import Validate from '../utils/Validate'
import AuthenticationService from '../services/AuthenticationService'
const DiscordStrategy = passportDiscord.Strategy

const Strategy = new DiscordStrategy(
    {
        clientID: OAuth.Discord.Client,
        clientSecret: OAuth.Discord.Secret,
        callbackURL: OAuth.Discord.Callback,
        scope: ['identify', 'email'],
    },
    async (_accessToken, _refreshToken, profile, cb) => {
        try {
            if (!profile.email) return cb(null, false, { message: 'Account failed to create due to unknown email' })

            const avatarUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            const userName = Validate.isLegalName(profile.username) ? removeAccents(profile.username.replace(/[\u0300-\u036F][\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')) : nameGenerator()
            const create = await AuthenticationService.passportFindOrCreate('Discord', profile.id, profile.email || '', userName, avatarUrl)
            if (create) return cb(null, create, { message: 'Account created' })
            else return cb(null, false, { message: 'Account failed to create' })
        } catch (e) {
            return cb(e as Error, false)
        }
    }
)

export default Strategy
