import express from 'express';
import passport from 'passport';

import useRatelimit from './middlewares/useRatelimit';
import validateCSRF from './middlewares/validateCSRF';

import AuthenticationRouter from './routes/AuthenticationRouter';


const start = (app: express.Express) => {
    const authRouter = express.Router();

    // Auth
    authRouter.get("/session", useRatelimit.sessionRequest, AuthenticationRouter.session);
    authRouter.get("/logout", useRatelimit.stateChange, AuthenticationRouter.logout);

    // Auth -> Basic
    authRouter.post("/login", useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.login);
    authRouter.post("/signup", useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.signup);
    authRouter.post("/forgot", useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.forgot);
    authRouter.post("/activate", useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.activate);
    authRouter.post("/sendForgot", useRatelimit.sessionUpdate, validateCSRF, AuthenticationRouter.sendForgot);
    authRouter.post("/logout", useRatelimit.sessionUpdate, AuthenticationRouter.logout);

    // Auth -> Passport
    authRouter.get("/discord/callback", passport.authenticate("discord", { failureRedirect: "/" }), AuthenticationRouter.PassportCallback );
    authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), AuthenticationRouter.PassportCallback );
    authRouter.get("/github/callback", passport.authenticate("github", { failureRedirect: "/" }), AuthenticationRouter.PassportCallback );
    authRouter.get("/discord", passport.authenticate("discord"));
    authRouter.get("/github", passport.authenticate("github"));
    authRouter.get("/google", passport.authenticate("google", { scope: [ "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email" ] }));


    app.use("/auth", authRouter);
}

export default { start };