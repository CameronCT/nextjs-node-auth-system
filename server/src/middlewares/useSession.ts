
import {NextFunction, Response} from "express";
import AuthenticationService from "../services/AuthenticationService";
import { RequestWithJWT } from "../types";
import getSessionToken from "../utils/getSessionToken";

export default (req: RequestWithJWT, res: Response, next: NextFunction) => {
    const getSession = AuthenticationService.jwtSimpleValidate(getSessionToken(req));
    if (getSession) {
        req.jwtSession = getSession.data;
        next();
    } else 
        return res.status(200).send({ error: "Invalid session!" });
}