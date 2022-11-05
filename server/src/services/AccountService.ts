import MongoSQL from '../utils/MongoSQL'

const update = async (accountId: string, displayName: string, avatarSrc: string) => await MongoSQL.findOneAndUpdate('accounts', { accountId }, { displayName, avatarSrc }).catch((e: string) => console.log(e))
const getOne = async (accountId: string) => await MongoSQL.findOne('accounts', { accountId }).catch((e: string) => console.log(e))
const getByUrl = async (url: string) => await MongoSQL.findOne('accounts', { accountId: url }).catch((e: string) => console.log(e))

const remove = async (accountId: string) => {
    // add more
    return await MongoSQL.deleteOne('accounts', { accountId }).catch((e: string) => console.log(e))
}

export default { getOne, getByUrl, update, remove }
