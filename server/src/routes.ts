import express from 'express'
import passport from 'passport'

import useRatelimit from './middlewares/useRatelimit'
import useSession from './middlewares/useSession'
import validateCSRF from './middlewares/validateCSRF'
import AccountRouter from './routes/AccountRouter'

import AuthenticationRouter from './routes/AuthenticationRouter'

const start = (app: express.Express) => {
    const authRouter = express.Router()
    const profileRouter = express.Router()

    // Auth
    authRouter.get('/session', useRatelimit.sessionRequest, AuthenticationRouter.session)
    authRouter.get('/gdpr', useRatelimit.sessionRequest, useSession, AuthenticationRouter.gdpr);
    authRouter.get('/logout', useRatelimit.sessionUpdate, AuthenticationRouter.logout)
    authRouter.post('/remove', useRatelimit.sessionRequest, useSession, AuthenticationRouter.remove);

    // Auth -> Basic
    authRouter.post('/login', useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.login)
    authRouter.post('/register', useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.signup)
    authRouter.post('/forgot', useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.forgot)
    authRouter.post('/activate', useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.activate)
    authRouter.post('/sendForgot', useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.sendForgot)
    authRouter.post('/logout', useRatelimit.sessionUpdate, AuthenticationRouter.logout)

    // Auth -> Passport
    authRouter.get('/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }), AuthenticationRouter.PassportCallback)
    authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), AuthenticationRouter.PassportCallback)
    authRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), AuthenticationRouter.PassportCallback)
    authRouter.get('/discord', passport.authenticate('discord'))
    authRouter.get('/github', passport.authenticate('github'))
    authRouter.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }))

    // Profile
    profileRouter.get('/', useRatelimit.standardGetRequest, AccountRouter.getByUrl)
    profileRouter.post('/update', useRatelimit.sessionUpdate, useSession, validateCSRF, AccountRouter.update);

    app.use('/auth', authRouter)
    app.use('/profile', profileRouter)
}

export default { start }
