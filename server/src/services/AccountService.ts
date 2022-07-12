import MongoSQL from '../utils/MongoSQL'

const update = async (accountId: string, displayName: string, avatarSrc: string) => await MongoSQL.findOneAndUpdate('accounts', { accountId }, { displayName, avatarSrc }).catch((e: string) => console.log(e))

export default { update }
