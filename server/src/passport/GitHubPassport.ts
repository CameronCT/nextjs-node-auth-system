import OAuth from "../oauth";
import removeAccents from "remove-accents";
import passportGithub from "passport-github2";
import nameGenerator from "../utils/nameGenerator";
import Validate from "../utils/Validate";
import AuthenticationService from "../services/AuthenticationService";

const Strategy = new passportGithub.Strategy(
    {
        clientID: OAuth.GitHub.Client,
        clientSecret: OAuth.GitHub.Secret,
        callbackURL: OAuth.GitHub.Callback,
        scope: ['user:email']
    },
    async (_accessToken:string, _refreshToken:string, profile:any, cb:any) => {
        try {
            if (!profile.emails || !profile.photos)
                return cb(null, false, { message: 'Account failed to create due to unknown email'});

            const avatarUrl = profile.photos[0].value;
            const userName = Validate.isLegalName(profile.username) 
                ? removeAccents(profile.username.replace(/[\u0300-\u036F][\uD800-\uDBFF][\uDC00-\uDFFF]/g, ""))
                : nameGenerator()
            const create = await AuthenticationService.passportFindOrCreate("GitHub", profile.id, profile.emails[0].value || '', userName, avatarUrl);
            if (create)
                return cb(null, create, { message: 'Account created' });
            else
                return cb(null, false, { message: 'Account failed to create'});
        } catch (e) {
            return cb(e, false);
        }
    }
);

export default Strategy;