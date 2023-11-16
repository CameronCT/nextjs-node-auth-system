import AccountLog from '../models/AccountLog'
import AppService from './AppService'

const add = async (accountId: string, action: string, ipAddress: string) => await AccountLog.insertOne({ accountId, action, ipAddress, created: new Date().getTime() / 1000 }).catch((e) => AppService.error('service', e))
const getByAccountId = async (accountId: string) => await AccountLog.find({ accountId }).catch((e) => AppService.error('service', e))

export default { add, getByAccountId }
