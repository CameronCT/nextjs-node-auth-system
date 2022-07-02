import { Response } from "express";
import AccountService from "../services/AccountService";
import { RequestWithJWT } from "../types";
import Validate from "../utils/Validate";
import AuthenticationRouter from "./AuthenticationRouter";

const update = async (req: RequestWithJWT, res: Response) => {
    const { displayName, avatarSrc } = req.body;

    if (!req.jwtSession?.accountId)
        return res.status(200).send({ error: "Invalid session!" });

    if (!displayName.trim() || !Validate.isAlphaNumerical(displayName) || !displayName || displayName.length <= 2 || displayName.length >= 16 || displayName.includes('%'))
        return res.status(200).send({ error: "Your display name must be less than 16 characters, greater than 2 characters and doesn't contain a % symbol!" });

    const response = await AccountService.update(String(req.jwtSession?.accountId), displayName, avatarSrc);
    if (response) {
        const setProfile = await AuthenticationRouter.profileLoginFinalized(req, res, response);
        if (setProfile) 
            return res.status(200).send({ success: "Your account has been updated!", token: setProfile });
        else 
            return res.status(200).send({ error: "Unable to find your profile!" });
    } else
        return res.status(200).send({ error: "Unable to validate your request, please make sure all fields are filled correctly!" });
};

export default { update };