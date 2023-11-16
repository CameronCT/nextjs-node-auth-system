import Account from "../models/Account"

const update = async (accountId: string, displayName: string) => await Account.findOneAndUpdate({ accountId }, { displayName }).catch((e: string) => console.log(e))
const getOne = async (accountId: string) => await Account.findOne({ accountId }).catch((e: string) => console.log(e))
const getByUrl = async (url: string) => await Account.findOne({ accountId: url }, { projection: { _id: 0, displayName: 1, avatarSrc: 1 }}).catch((e: string) => console.log(e))

const remove = async (accountId: string) => {
    // add more
    return await Account.deleteOne({ accountId }).catch((e: string) => console.log(e))
}

export default { getOne, getByUrl, update, remove }
