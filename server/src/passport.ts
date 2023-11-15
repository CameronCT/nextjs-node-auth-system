import session from "express-session";
import passport from 'passport'
import { Express } from 'express'
import DiscordPassport from './passport/DiscordPassport'
import GitHubPassport from './passport/GitHubPassport'
import GooglePassport from './passport/GooglePassport'
import { AccountData } from './types'
import Config from "./config";

const start = (app: Express) => {
    app.use(session({ secret: Config.jwt.secret, resave: false, saveUninitialized: false }));
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user: AccountData, done) => done(null, user))

    passport.use(DiscordPassport)
    passport.use(GooglePassport)
    passport.use(GitHubPassport)
}

export default { start }
