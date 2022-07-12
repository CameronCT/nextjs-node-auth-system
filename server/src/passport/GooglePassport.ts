import OAuth from '../oauth'
import removeAccents from 'remove-accents'
import passportGoogle from 'passport-google-oauth'
import Validate from '../utils/Validate'
import nameGenerator from '../utils/nameGenerator'
import AuthenticationService from '../services/AuthenticationService'
import Config from '../config'
const GoogleStrategy = passportGoogle.OAuth2Strategy

const Strategy = new GoogleStrategy(
    {
        clientID: OAuth.Google.Client,
        clientSecret: OAuth.Google.Secret,
        callbackURL: OAuth.Google.Callback,
    },
    async (_accessToken, _refreshToken, profile, cb) => {
        try {
            if (!profile.emails || !profile.photos) return cb(null, false, { message: 'Account failed to create due to unknown email' })

            const newProfileName = profile.displayName.split(' ')[0]

            const avatarUrl = profile.photos[0].value.length <= 254 ? profile.photos[0].value : `${Config.api.filesUrl}/avatars/default.png`
            const userName = Validate.isLegalName(newProfileName) ? removeAccents(newProfileName.replace(/[\u0300-\u036F][\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')) : nameGenerator()
            const create = await AuthenticationService.passportFindOrCreate('Google', profile.id, profile.emails[0].value || '', userName, avatarUrl)
            if (create) return cb(null, create, { message: 'Account created' })
            else return cb(null, false, { message: 'Account failed to create' })
        } catch (e) {
            return cb(e, false)
        }
    }
)

export default Strategy
