import MongoODM from "@cameronct/mongo-odm";

const Account = new MongoODM.Model("accounts", [
    { name: "accountId", type: MongoODM.FieldTypes.String, required: true },
    { name: "emailAddress", type: MongoODM.FieldTypes.String, required: true },
    { name: "displayName", type: MongoODM.FieldTypes.String, required: true },
    { name: "avatarSrc", type: MongoODM.FieldTypes.String, required: true, default: `${process.env.API_URL}/avatars/default.png` },
    { name: "authName", type: MongoODM.FieldTypes.String, required: true },
    { name: "authId", type: MongoODM.FieldTypes.String, required: true },
    { name: "authUser", type: MongoODM.FieldTypes.String, required: true, default: "" },
    { name: "authPassword", type: MongoODM.FieldTypes.String, required: true, default: "" },
    { name: "activationCode", type: MongoODM.FieldTypes.String, required: false, default: "" },
    { name: "recoveryCode", type: MongoODM.FieldTypes.String, required: false, default: "" },
], [ 
    { name: "uniqueAccountId", fields: { accountId: -1 }, unique: true },
], { 
    debug: false,
    log: 0,
})

export default Account;