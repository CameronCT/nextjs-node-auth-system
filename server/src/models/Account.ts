import MongoORM from "@cameronct/mongo-orm";

const Account = new MongoORM.Model("accounts", [
    { name: "accountId", type: MongoORM.FieldTypes.String, required: true },
    { name: "emailAddress", type: MongoORM.FieldTypes.String, required: true },
    { name: "displayName", type: MongoORM.FieldTypes.String, required: true },
    { name: "avatarSrc", type: MongoORM.FieldTypes.String, required: true, default: `${process.env.API_URL}/avatars/default.png` },
    { name: "authName", type: MongoORM.FieldTypes.String, required: true },
    { name: "authId", type: MongoORM.FieldTypes.String, required: true },
    { name: "authUser", type: MongoORM.FieldTypes.String, required: true, default: "" },
    { name: "authPassword", type: MongoORM.FieldTypes.String, required: true, default: "" },
    { name: "activationCode", type: MongoORM.FieldTypes.String, required: false, default: "" },
    { name: "recoveryCode", type: MongoORM.FieldTypes.String, required: false, default: "" },
], [ 
    { name: "uniqueAccountId", fields: { accountId: -1 }, unique: true },
], { 
    debug: false,
    log: 0,
})

export default Account;