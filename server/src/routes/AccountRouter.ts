import { Response } from "express";
import AccountService from "../services/AccountService";
import AppService from "../services/AppService";
import { RequestWithJWT } from "../types";
import Validate from "../utils/Validate";
import AuthenticationRouter from "./AuthenticationRouter";

const update = async (req: RequestWithJWT, res: Response) => {
    const { displayName, avatarSrc } = req.body;

    if (!req.jwtSession?.accountId)
        return AppService.send(res, "Invalid session!", null, 422);

    if (!displayName.trim() || !Validate.isAlphaNumerical(displayName) || !displayName || displayName.length <= 2 || displayName.length >= 16 || displayName.includes('%'))
        return AppService.send(res, "Your display name must be less than 16 characters, greater than 2 characters and doesn't contain a % symbol!", null, 422);

    const response = await AccountService.update(String(req.jwtSession?.accountId), displayName, avatarSrc);
    if (response) {
        const setProfile = await AuthenticationRouter.profileLoginFinalized(req, res, response);
        if (setProfile) 
            return AppService.send(res, "ok", { token: setProfile });
        else 
            return AppService.send(res, "Unable to find your profile!", null, 422);
    } else
        return AppService.send(res, "Unable to validate your request, please make sure all fields are filled correctly!", null, 422);
};

export default { update };