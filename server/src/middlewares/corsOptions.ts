import Config from "../config";

export default {
    credentials: true,
    origin: (origin: any, callback: (err: Error | null, allowed:boolean) => void) => {
        if (!origin || Config.api.cors.indexOf(origin) !== -1)
            callback(null, true);
        else
            callback(new Error(`Not allowed by CORS: ${origin}`), false);
    }
}