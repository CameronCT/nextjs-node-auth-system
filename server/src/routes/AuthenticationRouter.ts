import {Response} from 'express';
import Host from "../utils/HostUtil";
import {RequestWithJWT} from "../types";
import AccountLogService from "../services/AccountLogService";
import Validate from '../utils/Validate';
import sendMail from '../utils/sendMail';
import Config from '../config';
import UniqueIdService from '../services/UniqueIdService';
import AuthenticationService from '../services/AuthenticationService';
import getSessionToken from '../utils/getSessionToken';
import getCSRFToken from '../utils/getCSRFToken';

const profileLoginFinalized = async (req: RequestWithJWT, res: Response, user: any, isUpdate: boolean = false) => {
    if (!user)
        return res.status(422).send({ error: "Unable to find profile on callback!" });

    if (user?.authPassword) delete user.authPassword;

    // JWT
    const jwtToken = AuthenticationService.jwtCreate(user);

    // Tokens
    res.cookie("userSession", jwtToken, { maxAge: Config.jwt.expiry, domain: Config.api.cookieUrl, secure: Config.api.secure, });

    // Add Logs
    if (!isUpdate)
        await AccountLogService.add(user.accountId, 'logged_in', Host.getAddress(req));
    
    return jwtToken;
}

const PassportCallback = async (req: RequestWithJWT, res: Response) => {
    const response = await profileLoginFinalized(req, res, req.user);
    if (response) {
        // Resolve
        res.writeHead(301, { Location: Config.api.secure ? 'https' : 'http' + "://" + Config.api.webUrl + "/", });
        res.end();
    } else 
        return res.status(200).send({ error: "Unable to authenticate!" });
};

const session = async (req: RequestWithJWT, res: Response) => {
    AuthenticationService.jwtValidate(getSessionToken(req), async (httpCode, data) => {
        if (httpCode !== 200 || !data)  {
            const generateAuthId = UniqueIdService.generateOther("accountId");
            const generateAuthCode = UniqueIdService.generateOther("discriminator");
            const generateGuestCode = UniqueIdService.generateOther("guestId");

            const createGuest = await AuthenticationService.passportFindOrCreate('Guest', String(generateAuthId), `guest[${generateGuestCode}].${generateAuthCode}@keyma.sh`, `Guest_${UniqueIdService.generateOther('discriminator')}`, `${Config.api.filesUrl}/avatars/avatar_${Math.floor(Math.random() * 12)}.jpg`)
            if (createGuest) {
                const jwtAccess = AuthenticationService.jwtCreate(createGuest);
                res.cookie("userSession", jwtAccess, { maxAge: Config.jwt.expiry, domain: Config.api.cookieUrl, secure: Config.api.secure, });
                return res.status(200).send({ data: createGuest, token: jwtAccess, csrf: getCSRFToken(req) });
            } else
                return res.status(200).send({error: "Unable to create Guest!"});
        } else 
            return res.status(200).send({ ...data, token: getSessionToken(req), csrf: getCSRFToken(req) });
    });
}

const logout = async (_req: RequestWithJWT, res: Response) => {
    res.clearCookie("userSession", { domain: Config.api.cookieUrl });
    return res.status(200).send({ message: "Successfully logged out!" });
}

const login = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password)
        return res.status(200).send({ error: "Please make sure all fields are filled!" });

    const getData = await AuthenticationService.basicLogin(emailAddress, password);
    if (getData) {
        if (getData.activationCode) {
            const response = await AuthenticationService.basicSendActivate(emailAddress);
            if (response) {
                await sendMail(
                    emailAddress, 
                    `Please confirm your email address`, 
                    `
                        Welcome to ${Config.name}! In order to login, please activate your account by clicking the link below.<br/><br/>
                        <b><a href="${Config.api.secure ? 'https' : 'http'}://${Config.api.webUrl}/auth/activate/${response}">${Config.api.secure ? 'https' : 'http'}://${Config.api.webUrl}/auth/activate/${response}</a></b><br/><br/>
                        If you have any issues or have any other questions, please contact support@keymash.io!
                    `
                );
            }

            return res.status(200).send({ error: "Your account is not activated, please check your email for steps to activate your account!" });
        } else {
            const getProfile = await AuthenticationService.getByAccountId(getData.accountId);
            const response = await profileLoginFinalized(req, res, getProfile);
            if (response)
                return res.status(200).send({ token: response, csrf: getCSRFToken(req) });
            else 
                return res.status(200).send({ error: "Unable to authenticate!" });
        }
    } else
        return res.status(200).send({ error: "Invalid email or password, please try again!" }); 
};

const signup = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress, password, displayName } = req.body;

    if (!emailAddress || !password || !displayName)
        return res.status(200).send({ error: "Please make sure all fields are filled!" });

    if (!displayName.trim() || !Validate.isAlphaNumerical(displayName) || !displayName || displayName.length <= 2 || displayName.length >= 16 || displayName.includes('%'))
        return res.status(200).send({ error: "Your display name must be less than 16 characters, greater than 2 characters and doesn't contain a % symbol!" });

    if (!Validate.isPassword(password))
        return res.status(200).send({ error: "Your password must be at least 8 characters long and contain at least one number, one uppercase, one lowercase letter!" });

    const emailExists = await AuthenticationService.basicEmailExists(emailAddress);
    if (emailExists)
        return res.status(200).send({ error: "This email address is already in use!" });

    const response = await AuthenticationService.basicSignUp(emailAddress, password, displayName);
    if (response) {
        /*
        await sendMail(
            emailAddress, 
            `Please confirm your email address`, 
            `
                Welcome to ${Config.name}! In order to login, please activate your account by clicking the link below.<br/><br/>
                <b><a href="${Config.api.secure ? 'https' : 'http'}://${Config.api.webUrl}/auth/activate/${response}">${Config.api.secure ? 'https' : 'http'}://${Config.api.webUrl}/auth/activate/${response}</a></b><br/><br/>
                If you have any issues or have any other questions, please contact support@keymash.io!
            `
        );
        return res.status(200).send({ success: "Your account has been created, please check your email inside of your inbox or spam/junk folder for a confirmation email!" });
        */
        return res.status(200).send({ success: "Your account has been created, you may now login!" });
    } else
        return res.status(200).send({ error: "We were unable to create your account!" });
};

const sendForgot = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress } = req.body;

    if (!emailAddress)
        return res.status(200).send({ error: "Please make sure all fields are filled!" });

    const response = await AuthenticationService.basicSendForgot(emailAddress);
    if (response) {
        await sendMail(
            emailAddress, 
            `Reset your password`, 
            `
                You have requested to reset your password, please click the link below to reset your password.<br/><br/>
                <b><a href="${Config.api.secure ? 'https' : 'http'}://${Config.api.webUrl}/auth/forgot/${response}">${Config.api.secure ? 'https' : 'http'}://${Config.api.webUrl}/auth/forgot/${response}</a></b><br/><br/>
                If you did not make this request, you may contact support@keymash.io or simply ignore it.
            `
        );
    }
    return res.status(200).send({ error: "You will receive a message containing instructions to reset your password if your account exists." });
};

const forgot = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress, password, key } = req.body;

    if (!emailAddress || !password || !key)
        return res.status(200).send({ error: "Please make sure all fields are filled!" });

    if (!Validate.isPassword(password))
        return res.status(200).send({ error: "Your password must be at least 8 characters long and contain at least one number, one uppercase and one lowercase letter!" });

    const response = await AuthenticationService.basicForgot(emailAddress, key, password);
    if (response) {
        await sendMail(
            emailAddress, 
            `Your password has been changed`, 
            `
                You have successfully changed your password!<br/><br/>
                If you did not perform this request, please contact support@keymash.io immediately!
            `
        );
        return res.status(200).send({ success: "Your password has been changed!" });
    } else
        return res.status(200).send({ error: "Unable to validate your request, please make sure all fields are filled correctly!" });
};

const activate = async (req: RequestWithJWT, res: Response) => {
    const { emailAddress, key } = req.body;

    if (!emailAddress || !key)
        return res.status(200).send({ error: "Please make sure all fields are filled!" });

    const response = await AuthenticationService.basicActivate(emailAddress, key);
    if (response) {
        await sendMail(
            emailAddress, 
            `Your account has been activated`, 
            `Welcome! Your account is all set and ready to go!`
        );
        
        const getProfile = await AuthenticationService.getByAccountId(response);
        const setProfile = await profileLoginFinalized(req, res, getProfile);
        if (setProfile) 
            return res.status(200).send({ token: setProfile, csrf: getCSRFToken(req) });
        else 
            return res.status(200).send({ error: "Unable to authenticate!" });
    } else
        return res.status(200).send({ error: "Unable to validate your request, please make sure all fields are filled correctly!" });
};

export default { profileLoginFinalized, PassportCallback, session, logout, login, signup, forgot, sendForgot, activate };