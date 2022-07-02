import { RequestWithJWT } from "../types";

export default (
    req: RequestWithJWT
) => req.cookies?.userSession || req.headers?.["x-authentication-token"] || '';