import MongoSQL from "../utils/MongoSQL";
import AppService from "./AppService";

const add = async (accountId: string, action: string, ipAddress: string) => await MongoSQL.insertOne('accountLogs', { accountId, action, ipAddress, created: new Date().getTime() / 1000 }).catch((e) => AppService.error('service', e));

export default { add };