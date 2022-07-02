import {RequestWithJWT} from "../types";
import {NextFunction, Response} from "express";
import getCSRFToken from "../utils/getCSRFToken";

export default (req: RequestWithJWT, res: Response, next: NextFunction) => {
    const getCSRF = getCSRFToken(req);
    const isCapacitorJS = req.headers.origin?.startsWith('capacitor://') || false;

    if (!isCapacitorJS && (!getCSRF || getCSRF !== req.body._csrf))
        return res.status(422).send({ error: "Your session has expired, please try again!" });
    else
        next();
}