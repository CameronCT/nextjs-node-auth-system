import App from "../index";
import {v4 as uuidv4} from "uuid";

const generateSnowflake = (): string => {
    const generate = App.snowFlake.generate();
    return `${generate}`;
}

const generateUUID = () => {
    return uuidv4();
}

const generateOther =  ( type: string ): unknown => {
    let uniqueId: unknown;

    switch (type) {
        case "accountId":
            uniqueId = `guest_${generateSnowflake()}`;
            break;
        case "discriminator":
            uniqueId = Math.floor(Math.random() * 9999) + 1;
            break;
        case "guestId":
            uniqueId = Math.floor(Math.random() * 999) + 1;
            break;
        case "matchId":
            uniqueId = Math.floor(Math.random() * 999) + 1;
            break;
        case "roomId":
            uniqueId = String(Math.floor(Math.random() * 999999) + 100000);
            break;
        default:
            uniqueId = Math.floor(Math.random() * 999) + 1;
            break;
    }
    return uniqueId;
};


export default {generateOther, generateSnowflake, generateUUID};