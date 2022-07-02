import { Request, Response, NextFunction } from 'express';
import crypto from "crypto";
import Config from '../config';

export default (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.cookies._csrf) {
        res.cookie("_csrf", crypto.randomBytes(20).toString("hex"), {
            maxAge: Config.jwtExpiry,
            domain: Config.cookieUrl,
        });
    }
    next();
}